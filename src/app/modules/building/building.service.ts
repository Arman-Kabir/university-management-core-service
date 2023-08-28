import { Building } from "@prisma/client";
import prisma from "../../../shared/prisma";

// const prisma = new PrismaClient();

const insertIntoDB = async (data: Building): Promise<Building> => {
    // console.log(data);
    const result = await prisma.building.create({
        data
    
    })
    return result;
};

export const BuildingService={
    insertIntoDB
}