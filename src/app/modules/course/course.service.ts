import { Course, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ICourseCreateData, ICourseFilterRequest } from "./course.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { courseSearchAbleFields } from "./course.constants";

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

const getAllFromDB = async (
    filters: ICourseFilterRequest,
    options: IPaginationOptions
) => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: courseSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }

    if(Object.keys(filterData).length>0){
        andConditions.push({
            AND:Object.keys(filterData).map((key)=>({
                [key]:{
                    equals:(filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.CourseWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.course.findMany({
        include:{
            preRequisite:{
                include:{
                    preRequisite:true
                }
            },
            preRequisiteFor:{
                include:{
                    course:true
                }
            }
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy:
            options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc'
                }
    });

    const total = await prisma.course.count({
        where:whereConditions
    })


    return {
        meta:{
            total,
            page,
            limit 
        },
        data:result
    };
}


const updateOneInDB = async (
    id: string,
    payload: ICourseCreateData
): Promise<Course | null> => {

    const { preRequisiteCourses, ...courseData } = payload;
    
    await prisma.$transaction(async(transactionClient)=>{
        const result = await transactionClient.course.update({
            where:{
                id 
            },
            data:courseData
        })
        if(!result){
            throw new ApiError(httpStatus.BAD_REQUEST,"Unable to update course")
        }

        if(preRequisiteCourses && preRequisiteCourses.length >0){
            const deletePrerequisite = preRequisiteCourses.filter(
                (coursePrerequisite) => coursePrerequisite.courseId && coursePrerequisite.isDeleted
            )

            const newPrerequisite = preRequisiteCourses.filter(
                (coursePrerequisite)=>coursePrerequisite.courseId && !coursePrerequisite.isDeleted
            )

            for(let index= 0; index<deletePrerequisite.length;index++){
                await transactionClient.courseToPreRequisite.deleteMany({
                    where:{
                        AND:[
                            {
                                courseId:id
                            },
                            {
                                preRequisiteId:deletePrerequisite[index].courseId
                            }
                        ]
                    }
                })
            }

            for(let index =0;index<newPrerequisite.length;index++){
                await transactionClient.courseToPreRequisite.create({
                    data:{
                        courseId:id,
                        preRequisiteId:newPrerequisite[index].courseId
                    }
                })
            }
            // console.log(deletePrerequisite);
        }
        return result;
    });

    const responseData = await prisma.course.findUnique({
        where: {
            id: id
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

export const CourseService = {
    insertIntoDB,
    getAllFromDB,
    updateOneInDB
}