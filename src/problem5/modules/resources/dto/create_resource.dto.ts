import { constants } from 'http2'
import { body  } from 'express-validator'
import { Request } from 'express'
import { HttpError } from '../../../errors'


export class CreateResourceDto {
    name!: string;
    status!: number;
    description!: string;

    static get(req: Request): CreateResourceDto {
        if (req.body == null) {
            throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "create resource request a body data")
        }

        let dto: CreateResourceDto = req.body
        return dto
    }
}

export const createResourceValidations = [
    body('name')
        .notEmpty().withMessage('name must be a string')
        .isLength({ max: 256 }).withMessage('name max length must be between 256 characters long'),
    body('status')
        .optional()
        .isInt().withMessage('status must be an integer'),
    body('description')
        .isLength({ max: 4096 }).withMessage('description max length must be 4096 characters long')
]