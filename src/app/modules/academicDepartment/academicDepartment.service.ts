import { AcademicDepartment, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicDepartment): Promise<AcademicDepartment> => {
    const result = await prisma.academicDepartment.create({
        data,
        include: {
            academicFaculty: true
        }
    });
    return result;
};

const getAllFromDB = async () => {
    const result = await prisma.academicDepartment.findMany({});

    return result;
};

const getByIdFromDB = async (id: string): Promise<AcademicDepartment | null> => {
    const result = await prisma.academicDepartment.findUnique({
        where: {
            id
        }
    });
    return result;
}


export const AcademicDepartmentService = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB
}