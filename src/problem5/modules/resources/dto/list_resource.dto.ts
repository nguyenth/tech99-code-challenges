import { constants } from 'http2'
import { query } from 'express-validator'
import { Request } from 'express'
import { Resource } from '../../../entities';

export class ListResourceDto {
    id?: number;
    status?: number;
    page: number = 1;
    pageSize: number = 40;


    static get(req: Request): ListResourceDto {
        let dto = new ListResourceDto()
        dto.id = parseInt(req.query['id'] as string || '0')
        dto.status = parseInt(req.query['status'] as string || '0')
        dto.page = parseInt(req.query['page'] as string || '1')
        dto.pageSize = parseInt(req.query['pageSize'] as string || '40')

        dto.page = Math.min(Math.max(1, dto.page), 1000)
        dto.pageSize = Math.min(Math.max(1, dto.pageSize), 1000)

        return dto
    }
}

export class ListResourceResultDto {
    filter: ListResourceDto;
    data: Resource[];
    total: number;

    constructor(filter: ListResourceDto, data: Resource[], total: number) {
        this.filter = filter;
        this.data = data;
        this.total = total;
    }
}



export const listResourceValidations = [
    query('id')
        .optional()
        .isInt().withMessage('id must be an integer'),
    query('status')
        .optional()
        .isInt().withMessage('status must be an integer'),
    query('page')
    .optional()
        .isInt().withMessage('page must be an integer'),
    query('pageSize')
        .optional()
        .isInt().withMessage('pageSize must be an integer')
]