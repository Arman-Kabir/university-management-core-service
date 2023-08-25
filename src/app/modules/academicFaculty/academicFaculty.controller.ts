import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AcademicFacultyService } from "./academicFaculty.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty created successfully',
        data: result
    });
});


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    console.log(req.query);
    const filters = pick(req.query,['searchTerm','title']);
    const options = pick(req.query,['page','limit','sortBy','sortOrder']);
    console.log('filters',filters);
    console.log('options',options);


    const result = await AcademicFacultyService.getAllFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculties fetched successfully',
        meta:result.meta,
        data: result.data
    })
});


export const AcademicFacultyController = {
    insertIntoDB,
    getAllFromDB
}