"use client"

import { useState, useEffect } from 'react';

interface Author {
  fullName: string;
  email: string;
  affiliation: string;
  city: string;
  countryCode: string;
  contactNumber: string;
  isCorresponding: boolean;
}

interface Submission {
  _id: string;
  submissionId: string;
  paperTitle: string;
  track: string;
  authors: Author[];
  filePath: string;
}

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/submit_paper');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error: unknown) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submissions Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Submission ID</th>
              <th className="py-2 px-4 border-b">Paper Title</th>
              <th className="py-2 px-4 border-b">Track</th>
              <th className="py-2 px-4 border-b">Corresponding Author</th>
              <th className="py-2 px-4 border-b">File</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="py-2 px-4 border-b">{submission.submissionId}</td>
                <td className="py-2 px-4 border-b">{submission.paperTitle}</td>
                <td className="py-2 px-4 border-b">{submission.track}</td>
                <td className="py-2 px-4 border-b">
                  {submission.authors.find(author => author.isCorresponding)?.fullName}
                </td>
                <td className="py-2 px-4 border-b">
                  <a href={submission.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View File
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
