import { AcademicSemester, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";

const prisma = new PrismaClient();

const insertIntoDB = async (academicSemesterData: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data: academicSemesterData
    })

    return result;
};


const getAllFromDB = async (filters, options:IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.academicSemester.findMany({
        skip,
        take:limit,
    });

    const total = await prisma.academicSemester.count();
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }
};



export const AcademicSemesterService = {
    insertIntoDB,
    getAllFromDB
}