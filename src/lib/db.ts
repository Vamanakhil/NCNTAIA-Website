import mongoose from "mongoose";

main().catch(err => console.log(err));

async function main() {
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
      } else {
        throw new Error('MONGODB_URI environment variable is required');
      }
}

const FeedbackSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    institution: { type: String, required: true },
    designation: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
})

const feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default feedback;

