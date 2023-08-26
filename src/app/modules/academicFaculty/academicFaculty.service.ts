import { AcademicFaculty, Prisma, PrismaClient } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAcademicFacultyFilterRequest } from "./academicFaculty.interface";
import { AcademicFacultySearchAbleFields } from "./academicFaculty.constants";


const prisma = new PrismaClient();


const insertIntoDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data
    });
    return result;
};

const getAllFromDB = async (
    filters: IAcademicFacultyFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {

    console.log(filters, options);
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    // console.log(filterData);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: AcademicFacultySearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
        // console.log(Object.keys(filterData));
    }

    const whereConditions: Prisma.AcademicFacultyWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};



    const result = await prisma.academicFaculty.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ?
            {
                [options.sortBy]: options.sortOrder
            }
            :
            {
               createdAt:'desc' 
            }
    });

    const total = await prisma.academicFaculty.count();
    // return result;
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
};

export const AcademicFacultyService = {
    insertIntoDB,
    getAllFromDB
}