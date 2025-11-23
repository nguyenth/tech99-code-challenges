import { Router, Request, Response } from 'express'
import { constants } from 'http2'
import { param, body, validationResult } from 'express-validator'

import { HttpError } from '../../errors'
import { resourceService } from './resource.service'
import { createResourceValidations, CreateResourceDto } from './dto/create_resource.dto'
import { updateResourceValidations, UpdateResourceDto } from './dto/update_resource.dto'
import { listResourceValidations, ListResourceDto } from './dto/list_resource.dto'
import { filter } from 'compression'

let router: Router = Router()
export default router


router.post("/", createResourceValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "invalid request", errors)
    }

    let dto = CreateResourceDto.get(req)
    try {
        let entity = await resourceService.addResource(dto)
        res.json(entity)
    } catch (e) {
        throw new HttpError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, (e as Error).message)
    }
})

router.get("/search", listResourceValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "invalid request", errors)
    }

    let dto = ListResourceDto.get(req)
    let result = await resourceService.searchResources(dto)
    res.json(result)
})

router.get("/:id", [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt({ min: 1 }).withMessage('ID must be an integer greater than or equal to 1')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "invalid request", errors)
    }

    let id = parseInt(req.params.id)
    let resource = await resourceService.getResourceById(id)
    if (!resource) {
        throw new HttpError(constants.HTTP_STATUS_NOT_FOUND, "resource not found")
    }

    res.json(resource)
})

router.put("/:id", updateResourceValidations, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "invalid request", errors)
    }

    let dto = UpdateResourceDto.get(req)
    try {
        let entity = await resourceService.updateResource(dto.id, dto)
        res.json(entity)
    } catch (e) {
        throw new HttpError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, (e as Error).message)
    }
})

router.delete("/:id", [
    param('id')
        .exists().withMessage('ID parameter is required')
        .isInt({ min: 1 }).withMessage('ID must be an integer greater than or equal to 1')
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError(constants.HTTP_STATUS_BAD_REQUEST, "invalid request", errors)
    }

    try {
        let id = parseInt(req.params.id)
        await resourceService.deleteResource(id)
        res.json({ id })
    } catch (e) {
        throw new HttpError(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, (e as Error).message)
    }
})