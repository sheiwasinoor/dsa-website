import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_RECEIVER = process.env.CONTACT_RECEIVER;

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }

  // Read multipart form
  const form = await readMultipartFormData(event);
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received' });
  }

  // Helper to get fields safely
  const getField = (name: string) => form.find(f => f.name === name && f.data)?.data?.toString('utf8') || '';

  // Extract text fields
  const firstName   = getField('firstName');
  const lastName    = getField('lastName');
  const mobile      = getField('mobile');
  const email       = getField('email');
  const status      = getField('status');
  const location    = getField('location');
  const position    = getField('position');
  const message     = getField('message');

  // Basic validation
  if (!firstName || !lastName || !mobile || !email || !status || !location || !position || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    });
  }

  // Extract uploaded files
  const resumeFile = form.find(f => f.name === 'resume' && f.filename);
  const portfolioFile = form.find(f => f.name === 'portfolio' && f.filename);

  if (!resumeFile || !portfolioFile) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Resume and portfolio are required'
    });
  }

  if (resumeFile.type !== 'application/pdf' || portfolioFile.type !== 'application/pdf') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Resume and portfolio must be PDF files'
    });
  }

  // Save file to /public/uploads/contact/
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'contact');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  function saveFile(file: any, label: string) {
    const fileName = `${Date.now()}_${label}_${file.filename}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.data);
    return `/uploads/contact/${fileName}`;
  }

  const resumeUrl = saveFile(resumeFile, 'resume');
  const portfolioUrl = saveFile(portfolioFile, 'portfolio');

  // Save into database
  const prisma = new PrismaClient();
  const saved = await prisma.contactSubmission.create({
    data: {
      firstName,
      lastName,
      mobile,
      email,
      status,
      location,
      position,
      message,
      resumeUrl,
      portfolioUrl
    }
  });

  if (CONTACT_RECEIVER && process.env.RESEND_API_KEY) {
    try {
      const attachments = [];
      if (resumeFile?.data) {
        attachments.push({
          filename: resumeFile.filename,
          content: resumeFile.data,
        });
      }
      if (portfolioFile?.data) {
        attachments.push({
          filename: portfolioFile.filename,
          content: portfolioFile.data,
        });
      }

      await resend.emails.send({
        from: 'DSA Website <no-reply@dsa-dayoung.com>',
        to: [CONTACT_RECEIVER],
        subject: `New Job Application — ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
          <hr />
          <p><strong>Resume:</strong> <a href="${resumeUrl}">${resumeUrl}</a></p>
          <p><strong>Portfolio:</strong> <a href="${portfolioUrl}">${portfolioUrl}</a></p>
        `,
        attachments,
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
    }
  }

  return {
    success: true,
    message: 'Contact form submitted successfully',
    id: saved.id
  };
});
