import { Resend } from 'resend';
import { ContactFormEmail } from '@/emails/contact-form';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email, subject, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Portfolio Contact <hello@resend.analyzeurbiz.com>',
      to: ['sacha@analyzeurbiz.com'],
      subject: `Nouveau contact: ${subject}`,
      react: ContactFormEmail({
        email,
        subject,
        message,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
} 