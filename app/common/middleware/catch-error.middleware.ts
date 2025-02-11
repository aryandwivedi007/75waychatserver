// import { type Response, type Request, type NextFunction } from "express";
// import expressAsyncHandler from "express-async-handler";
// import { validationResult } from "express-validator";
// import createHttpError from "http-errors";

// export const catchError = expressAsyncHandler(
//   (req: Request, res: Response, next: NextFunction) => {
//     const errors = validationResult(req);
//     const isError = errors.isEmpty();
//     // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//     if (!isError) {
//       const data = { errors: errors.array() };
//       throw createHttpError(400, {
//         message: "Validation error!",
//         data,
//       });
//     } else {
//       next();
//     }
//   }
// );

import { type Response, type Request, type NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';

export const catchError = expressAsyncHandler((req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors.array());
    const data = { errors: errors.array() };
    throw res.status(400).send({
      success: false,
      data,
    });
  }
  next();
});
