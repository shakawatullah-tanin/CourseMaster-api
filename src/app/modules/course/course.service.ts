import { Course } from "./course.model";

const createCourse = async (payload: any) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (query: any) => {
  const { search, category, sortBy, sortOrder, page = 1, limit = 10 } = query;

  const filter: any = {};

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) {
    filter.category = category;
  }

  const skip = (Number(page) - 1) * Number(limit);

  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const result = await Course.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const total = await Course.countDocuments(filter);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
        totalPage: Math.ceil(total / Number(limit)),
    },
    data: result,
  };
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    "enrolledStudents",
    "name email"
  );
  return result;
};

const updateCourse = async (id: string, payload: any) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourse = async (id: string) => {
  return await Course.findByIdAndDelete(id);
};

export const CourseService = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
