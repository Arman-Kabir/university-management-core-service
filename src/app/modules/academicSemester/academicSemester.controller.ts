import { Request, Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemester } from "@prisma/client";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { AcademicSemesterFilterAbleFields } from "./academicSemester.constants";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.insertIntoDB(req.body);
    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester Created",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query);
    const filters = pick(req.query,AcademicSemesterFilterAbleFields);
    const options = pick(req.query,['limit','page','sortBy','sortOrder']);
    console.log("filters",filters);
    console.log("options",options);



    const result = await AcademicSemesterService.getAllFromDB(filters,options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester data fetched",
        meta: result.meta,
        data: result.data
    })
})


export const AcademicSemesterController = {
    insertIntoDB,
    getAllFromDB
}