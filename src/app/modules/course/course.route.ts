import express from "express";
import { createCourseValidation, updateCourseValidation } from "./course.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post(
  "/create-course",
  checkAuth(Role.ADMIN),  
  validateRequest(createCourseValidation),
  CourseController.createCourse
);

router.get(
  "/",
  CourseController.getAllCourses
);

router.get(
  "/:id",
  CourseController.getSingleCourse
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN),
  validateRequest(updateCourseValidation),
  CourseController.updateCourse
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN),
  CourseController.deleteCourse
);

export const CourseRoutes = router;
