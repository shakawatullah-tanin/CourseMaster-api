import { Schema, model } from "mongoose";

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    duration: { type: Number, required: false },
  },
  { timestamps: true }
);

const quizSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
  },
  { timestamps: true }
);

const assignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    dueDate: { type: Date, required: false },
  },
  { timestamps: true }
);

const batchSchema = new Schema(
  {
    batchName: { type: String, required: true },
    startDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [{ type: String, required: false }],

    lessons: [lessonSchema],
    syllabus: [{ type: String }],
    quizzes: [quizSchema],
    assignments: [assignmentSchema],
    batches: [batchSchema],

    enrolledStudents: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
  },
  { timestamps: true }
);

export const Course = model("Course", courseSchema);
