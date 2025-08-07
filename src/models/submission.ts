import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  affiliation: { type: String, required: true },
  city: { type: String, required: true },
  countryCode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  isCorresponding: { type: Boolean, required: true },
});

const SubmissionSchema = new mongoose.Schema({
  paperTitle: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: [String], required: true },
  track: { type: String, required: true },
  submissionType: { type: String, required: true },
  researchDomain: { type: String, required: true },
  authors: { type: [AuthorSchema], required: true },
  otherTrack: { type: String },
  submissionId: { type: String, unique: true },
  filePath: { type: String },
});

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
