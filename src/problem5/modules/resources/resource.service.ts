import { Repository } from 'typeorm'

import { Resource } from '../../entities'
import { CreateResourceDto } from './dto/create_resource.dto'
import { UpdateResourceDto } from './dto/update_resource.dto'
import { AppDataSource } from '../../data-source'
import { ListResourceDto, ListResourceResultDto } from './dto/list_resource.dto'

export class ResourceService {
    resourceRepo: Repository<Resource>;

    constructor(resourceRepo: Repository<Resource>) {
        this.resourceRepo = resourceRepo;
    }

    async getResourceById(id: number): Promise<Resource | null> {
        return this.resourceRepo.findOne({
            where: { id },
        });
    }


    async addResource(dto: CreateResourceDto): Promise<Resource | null> {
        let entity = Object.assign(new Resource(), dto)
        await this.resourceRepo.insert(entity)
        return entity
    }

    async updateResource(id: number, dto: UpdateResourceDto) {
        let entity = Object.assign(new Resource(), dto)
        await this.resourceRepo.update(id, entity)
    }

    async deleteResource(id: number) {
        await this.resourceRepo.delete(id)
    }

    async searchResources(dto: ListResourceDto): Promise<ListResourceResultDto> {
        let query = this.resourceRepo.createQueryBuilder("resource");

        if (dto.id) {
            query = query.andWhere("resource.id = :id", { id: dto.id });
        }

        if (dto.status) {
            query = query.andWhere("resource.status = :status", { status: dto.status });
        }

        query = query.skip((dto.page - 1) * dto.pageSize).take(dto.pageSize);
        let [data, total] = await query.getManyAndCount();

        return new ListResourceResultDto(dto, data, total);
    }
}

export const resourceService = new ResourceService(AppDataSource.getRepository(Resource)) 