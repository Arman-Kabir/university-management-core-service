import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BuildingService } from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { buildingFilterableFields } from "./building.constants";
import pick from "../../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.body);
    const result = await BuildingService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building created successfully",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.query);

    const filters = pick(req.query, buildingFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await BuildingService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Building fetched successfully",
        meta:result.meta,
        data: result.data
    })
});



export const BuildingController = {
    insertIntoDB,
    getAllFromDB
}