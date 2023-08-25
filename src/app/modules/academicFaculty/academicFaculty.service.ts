import { AcademicFaculty, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


const insertIntoDB = async (data: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data
    });
    return result;
};

const getAllFromDB = async () => {
    const result = prisma.academicFaculty.findMany({

    });

    return result;
    //  {
    //     data:result
    // };
};

export const AcademicFacultyService = {
    insertIntoDB,
    getAllFromDB
}