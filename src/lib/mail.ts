import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendSubmissionConfirmation(to: string, authorName: string, submissionId: string) {
  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to,
    subject: 'Your Submission to NCNTAIA 2025',
    html: `
      <p>Dear ${authorName},</p>
      <p>Thank you for submitting your paper to the National Conference on Next-Gen Technologies in AI Applications (NCNTAIA 2025).</p>
      <p>Your submission ID is: <strong>${submissionId}</strong></p>
      <p>Please use this ID for all future correspondence regarding your submission.</p>
      <p>Our peer review committee will now review your paper. We will notify you of the outcome and any further proceedings within 48 hours.</p>
      <p>We appreciate your contribution and look forward to the possibility of including your work in our conference.</p>
      <p>Best regards,<br>The NCNTAIA 2025 Organizing Committee</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
