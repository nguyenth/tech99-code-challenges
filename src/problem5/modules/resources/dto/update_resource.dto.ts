import { constants } from 'http2'
import { Request } from 'express'
import { body, param } from 'express-validator'
import { HttpError } from '../../../errors'

export class UpdateResourceDto {
    id!: number;
    name?: string;
    description?: string;

    static get(req: Request): UpdateResourceDto {
        if (req.body == null) {
            throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "create resource request a body data")
        }

        let dto: UpdateResourceDto = req.body
        dto.id = parseInt(req.params.id)
        return dto
    }
}

export const updateResourceValidations = [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt({ min: 1 }).withMessage('ID must be an integer greater than or equal to 1'),
    body('name')
        .isLength({ max: 256 }).withMessage('name max length must be between 256 characters long'),
    body('status')
        .optional()
        .isInt().withMessage('status must be an integer'),
    body('description')
        .isLength({ max: 4096 }).withMessage('description max length must be 4096 characters long')
]