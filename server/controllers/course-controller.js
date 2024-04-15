const courseModel = require("../models/coursemodel");
const handlePagination = require("../helpers/pagination-handler");
const handleValidateAdmin = require("../helpers/super-user-validation");

const handleUserEnrollment = async (req, res) => {
  try {
    const { profile_id } = req.params;
    const coursesObject = await courseModel.create();
    coursesObject.enrolled_users_id.push(profile_id);
    coursesObject.users_count = courseModel.users_count + 1;
    await coursesObject.save();
    return res.json({ message: "Successfully enrolled the user", status: 201 });
  } catch (error) {
    console.log(`Unable to process your request due to error ${error}`);
  }
};

const handleCreateNewCourse = async (req, res) => {
  const { coursename, coursecategory, courselevel, coursevideolink } = req.body;
  try {
    await userProfileModel.build({
      coursename: coursename,
      coursecategory: coursecategory,
      courselevel: courselevel,
      coursevideolink: coursevideolink,
    });
    return res.json({
      message: "Successfully created new course",
      status: 201,
      success: true,
    });
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
      success: false,
    });
  }
};

const handleCourseDeletion = async (req, res) => {
  const { course_id } = req.params;
  try {
    const expectedCourse = await courseModel.findByPk(course_id);
    if (!expectedCourse) {
      return res.json({ message: "Unable to find such course", status: 404 });
    } else {
      await expectedCourse.destroy();
      return res.json({ message: "User deleted successfully", status: 201 });
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleUpdateCourseById = async (req, res) => {
  const { course_id } = req.params;
  const { coursename, coursecategory, courselevel, coursevideolink } = req.body;
  try {
    const requiredCourse = await courseModel.findByPk(course_id);
    if (!requiredCourse) {
      return res.json({ message: "No such course found", status: 404 });
    } else {
      courseModel.set({
        coursename: coursename,
        coursecategory: coursecategory,
        courselevel: courselevel,
        coursevideolink: coursevideolink,
      });
      await courseModel.save();
      return res.json({
        message: "Successfully updated the course details",
        status: 201,
      });
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleFindAllCourses = async (req, res) => {
  try {
    const searchResponse = await courseModel.findAll();
    if (!searchResponse) {
      return res.json({ message: "No such courses found", status: 404 });
    } else {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = page - 1;
      const endIndex = limit - 1;
      const response = handlePagination(startIndex, endIndex, searchResponse);
      return res.json(response);
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const handleFindFilteredCourse = async (req, res) => {
  const { coursename, coursecategory, courselevel, users_count } = req.query;
  try {
    const generalData = await courseModel.find();
    let filteredData;
    if (coursename) {
      filteredData = generalData.filter(
        (item) => item.coursename === coursename
      );
    }
    if (coursecategory) {
      filteredData = generalData.filter(
        (item) => item.coursecategory === coursecategory
      );
    }
    if (courselevel) {
      filteredData = generalData.filter(
        (item) => item.courselevel === courselevel
      );
    }
    if (users_count) {
      filteredData = generalData.filter(
        (item) => item.users_count === users_count
      );
    }
    if (!filteredData) {
      return res.json({ message: "No courses found", status: 404 });
    } else {
      return res.send(filteredData);
    }
  } catch (error) {
    return res.json({
      message: `Unable to process your request due to error ${error}`,
      status: 500,
    });
  }
};

const express = require("express");

const getAllCourseRouter = express.Router();
const postNewCourseRouter = express.Router();
const updateCourseRouter = express.Router();
const deleteCourseRouter = express.Router();
const getFilteredCourseRouter = express.Router();
const userEnrollmentRouter = express.Router();

getAllCourseRouter.get("/courses/get-sample-course", handleFindAllCourses);
postNewCourseRouter.post(
  "/courses/post-new-course",
  handleValidateAdmin,
  handleCreateNewCourse
);
updateCourseRouter.patch(
  "/courses/update-prev-course/:id",
  handleValidateAdmin,
  handleUpdateCourseById
);
deleteCourseRouter.delete(
  "/courses/delete-prev-course/:id",
  handleValidateAdmin,
  handleCourseDeletion
);
getFilteredCourseRouter.get(
  "/courses/get-filtered-course",
  handleFindFilteredCourse
);
userEnrollmentRouter.post("/courses/enroll-new-user/:id", handleUserEnrollment);

module.exports = {
  userEnrollmentRouter: userEnrollmentRouter,
  getAllCourseRouter: getAllCourseRouter,
  postNewCourseRouter: postNewCourseRouter,
  deleteCourseRouter: deleteCourseRouter,
  getFilteredCourseRouter: getFilteredCourseRouter,
};
