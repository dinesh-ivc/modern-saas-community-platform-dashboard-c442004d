import { Toaster } from 'sonner';
import '@/app/globals.css';

export const metadata = {
  title: 'Modern SaaS Community Platform',
  description: 'A modern community engagement platform for collaboration and knowledge sharing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}