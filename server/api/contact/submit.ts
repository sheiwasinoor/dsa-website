import { defineEventHandler, readMultipartFormData, createError } from 'h3';
import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import path from 'path';

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

  return {
    success: true,
    message: 'Contact form submitted successfully',
    id: saved.id
  };
});