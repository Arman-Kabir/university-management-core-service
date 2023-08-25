import { AcademicFaculty, PrismaClient } from "@prisma/client";
import {  IGenericResponse } from "../../../interfaces/common";


const prisma = new PrismaClient();


const insertIntoDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data
    });
    return result;
};

const getAllFromDB = async (
    filters,
    options
):Promise<IGenericResponse<AcademicFaculty[]>> => {

    
    const result = await prisma.academicFaculty.findMany({

    });

    const total = await prisma.academicFaculty.count();


    // return result;
    return{
        meta:{
            total,
            page:1,
            limit:10
        },
        data: result
    };
};

export const AcademicFacultyService = {
    insertIntoDB,
    getAllFromDB
}