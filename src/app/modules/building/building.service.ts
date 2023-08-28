import { Building, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBuildingFilterRequest } from "./building.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { buildingSearchAbleFields } from "./building.constants";
import { IGenericResponse } from "../../../interfaces/common";

// const prisma = new PrismaClient();

const insertIntoDB = async (data: Building): Promise<Building> => {
    // console.log(data);
    const result = await prisma.building.create({
        data

    })
    return result;
};

const getAllFromDB = async (
    filters: IBuildingFilterRequest,
    options: IPaginationOptions

): Promise<IGenericResponse<Building[]>> => {
    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters;
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: buildingSearchAbleFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    const whereConditions: Prisma.BuildingWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.building.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder
            }
            : {
                createdAt: 'desc'
            }
    });

    const total = await prisma.building.count({
        where: whereConditions
    });
    
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}



export const BuildingService = {
    insertIntoDB,
    getAllFromDB
}