import { AcademicDepartment, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


const insertIntoDB = async (data: AcademicDepartment): Promise<AcademicDepartment> => {
    const result = await prisma.academicDepartment.create({
        data
    });
    return result;
}

export const AcademicDepartmentService = {
    insertIntoDB
}