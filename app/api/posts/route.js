/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       401:
 *         description: Unauthorized
 */

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    const supabase = createAdminClient();

    let query = supabase
      .from('posts')
      .select(`
        *,
        user:users(id, full_name, email, avatar_url, role)
      `)
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Database error fetching posts:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // Get comment counts for each post
    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        const { count } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        return {
          ...post,
          comment_count: count || 0,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: postsWithCounts,
    });
  } catch (error) {
    console.error('Error in GET /api/posts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await verifyToken(token);
    const body = await request.json();
    const { title, content } = body;

    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Title must be at least 5 characters' },
        { status: 400 }
      );
    }

    if (!content || content.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: 'Content must be at least 20 characters' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: post, error } = await supabase
      .from('posts')
      .insert([
        {
          user_id: user.id,
          title: title.trim(),
          content: content.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error creating post:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create post' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: post,
        message: 'Post created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/posts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}