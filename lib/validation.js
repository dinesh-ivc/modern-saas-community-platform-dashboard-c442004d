export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password && password.length >= 8;
}

export function validateRegistration({ email, password, full_name, role }) {
  if (!email || !validateEmail(email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  if (!password || !validatePassword(password)) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  if (!full_name || full_name.trim().length === 0) {
    return { valid: false, error: 'Full name is required' };
  }

  if (!role || !['admin', 'moderator', 'member'].includes(role)) {
    return { valid: false, error: 'Valid role is required' };
  }

  return { valid: true };
}

export function validatePost({ title, content }) {
  if (!title || title.trim().length < 5) {
    return { valid: false, error: 'Title must be at least 5 characters' };
  }

  if (!content || content.trim().length < 20) {
    return { valid: false, error: 'Content must be at least 20 characters' };
  }

  return { valid: true };
}

export function validateComment({ content }) {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Comment content is required' };
  }

  return { valid: true };
}