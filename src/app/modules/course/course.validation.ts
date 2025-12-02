import { title } from "process";
import { z } from "zod";

export const lessonZodSchema = z.object({
  title: z.string().min(3, "Lesson title required"),
  videoUrl: z.string(),
  duration: z.number().optional(),
});

export const quizZodSchema = z.object({
  question: z.string().min(5),
  options: z.array(z.string()).min(2),
  correctAnswer: z.number(),
});

export const assignmentZodSchema = z.object({
  title: z.string().min(3),
  instructions: z.string().min(10),
  dueDate: z.string().optional(),
});

export const batchZodSchema = z.object({
  batchName: z.string().min(2),
  startDate: z.string(),
});

export const createCourseValidation = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    instructor: z.string().min(3),
    price: z.number().positive(),
    category: z.string().min(2),
    tags: z.array(z.string()).optional(),
    syllabus: z.array(z.string()).optional(),
    lessons: z.array(lessonZodSchema).optional(),
    quizzes: z.array(quizZodSchema).optional(),
    assignments: z.array(assignmentZodSchema).optional(),
    batches: z.array(batchZodSchema).optional(),
});

export const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    instructor: z.string().optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    syllabus: z.array(z.string()).optional(),
    lessons: z.array(lessonZodSchema).optional(),
    quizzes: z.array(quizZodSchema).optional(),
    assignments: z.array(assignmentZodSchema).optional(),
    batches: z.array(batchZodSchema).optional(),
  }),
});
