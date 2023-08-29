import { Course } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ICourseCreateData } from "./course.interface";

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
    const { preRequisiteCourses, ...courseData } = data;

    const newCourse = await prisma.$transaction(async (transactionClient) => {
        const result = await transactionClient.course.create({
            data: courseData
        });

        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            for (let index = 0; index < preRequisiteCourses.length; index++) {
                const createPrerequisite = await transactionClient.courseToPreRequisite.create({
                    data: {
                        courseId: result.id,
                        preRequisiteId: preRequisiteCourses[index].courseId
                    }
                });
                console.log(createPrerequisite);
            }
        };
        return result;
    });


    if (newCourse) {
        const responseData = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        preRequisite: true,
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }
            }
        })
        return responseData;
    };
};

const getAllFromDB = async () => {
    const result = await prisma.course.findMany({});
    return result;
}

const updateOneInDB = async (
    id: string,
    payload: ICourseCreateData
): Promise<Course | null> => {

    const { preRequisiteCourses, ...courseData } = payload;
    const result = await prisma.course.update({
        where: {
            id
        },
        data: courseData
    });
    return result;
};



export const CourseService = {
    insertIntoDB,
    getAllFromDB,
    updateOneInDB
}