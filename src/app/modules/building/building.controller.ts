import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BuildingService } from "./building.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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
export const BuildingController = {
    insertIntoDB
}