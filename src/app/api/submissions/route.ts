import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/submission';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedAuthHeader = `Bearer ${process.env.API_SECRET_KEY}`;

  if (authHeader !== expectedAuthHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const submissions = await Submission.find({});
    return NextResponse.json(submissions);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch submissions.', error: error }, { status: 500 });
  }
}
