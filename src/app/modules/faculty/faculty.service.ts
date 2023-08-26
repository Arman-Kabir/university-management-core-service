import { Faculty } from "@prisma/client";
import prisma from "../../../shared/prisma";


const insertIntoDB = async (data: Faculty): Promise<Faculty> => {
    const result = prisma.faculty.create({
        data,
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });
    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.faculty.findMany({
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });
    return result;
};

const getByIdFromDB = async (id: string): Promise<Faculty | null> => {
    const result = await prisma.faculty.findUnique({
        where: {
            id
        },
        include: {
            academicDepartment: true,
            academicFaculty: true
        }
    });
    return result;
}


export const facultyService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB
}