import { AcademicFaculty, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const insertIntoDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data
    });
    return result;
};

export const AcademicFacultyService = {
    insertIntoDB
}