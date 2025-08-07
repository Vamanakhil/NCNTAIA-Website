import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/submission';
import Counter from '@/models/counter';
import { sendSubmissionConfirmation } from '@/lib/mail';
import { writeFile } from 'fs/promises';
import { join } from 'path';

async function getNextSequenceValue(sequenceName: string) {
  const trackPrefixes: { [key: string]: number } = {
    'ai-ml': 100,
    'cloud-iot-smart': 200,
    'big-data-analytics': 300,
    'cybersecurity-blockchain': 400,
    'other': 1111,
  };

  const sequence = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );

  const startValue = trackPrefixes[sequenceName] || 1111;

  if (sequence.sequence_value === 1) {
    return startValue;
  }
  
  return startValue + sequence.sequence_value - 1;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const allowedOrigins = ['http://localhost:3002','http://localhost:3001', 'https://ncntaia.sreenidhi.edu.in'];

  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const authors = JSON.parse(formData.get('authors') as string);
    const keywords = JSON.parse(formData.get('keywords') as string);

    const data = {
      paperTitle: formData.get('paperTitle') as string,
      abstract: formData.get('abstract') as string,
      keywords: keywords,
      track: formData.get('track') as string,
      submissionType: formData.get('submissionType') as string,
      researchDomain: formData.get('researchDomain') as string,
      authors: authors,
      otherTrack: formData.get('otherTrack') as string,
      filePath: file ? file.name : '',
    };

    const track = data.track || 'other';
    const nextId = await getNextSequenceValue(track);
    const submissionId = `NCNTAIA25_${nextId}`;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join(process.cwd(), 'public/submissions', file.name);
      await writeFile(path, buffer);
      data.filePath = `/submissions/${file.name}`;
    }

    const submissionData = {
      ...data,
      submissionId,
    };
    
    const savedSubmission = await Submission.create(submissionData);

    const correspondingAuthor = savedSubmission.authors.find(author => author.isCorresponding);
    if (correspondingAuthor) {
      await sendSubmissionConfirmation(correspondingAuthor.email, correspondingAuthor.fullName, savedSubmission.submissionId);
    }

    return NextResponse.json({
      message: 'Submission successful!',
      response: savedSubmission,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Submission failed.', error: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const submissions = await Submission.find({});
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch submissions.', error: error }, { status: 500 });
  }
}
