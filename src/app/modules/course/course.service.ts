import { Course } from "@prisma/client";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (data: any): Promise<any> => {
    const { preRequisiteCourses, ...courseData } = data;

    console.log(preRequisiteCourses);
    console.log(courseData);

    const result = await prisma.course.create({
        data: courseData
    });

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        for (let index = 0; index < preRequisiteCourses.length; index++) {
            const createPrerequisite = await prisma.courseToPreRequisite.create({
                data:{
                    courseId:result.id,
                    preRequisiteId:preRequisiteCourses[index].courseId
                }
            });
            console.log(createPrerequisite);
        }
    }



    return result;
};

export const CourseService = {
    insertIntoDB
}