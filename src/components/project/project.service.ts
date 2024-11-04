import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repository/ProjectRepository';
import { Paginate } from 'src/utils/Paginate';
import { SortBy } from './domain/enums/SortBy';
import { Order } from './domain/enums/Order';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectRepository.create(createProjectDto);
  }

  async findAll(page: number | undefined, itemsPage: number | undefined, sortBy?: SortBy, order?: Order) {
    const pagination = new Paginate(page, itemsPage);
    const projects = await this.projectRepository.findAll(pagination, sortBy, order);

    if (sortBy === SortBy.PRIORITY_LEVEL) {
      const orderFactor = order === Order.ASC ? 1 : -1;
      projects.sort((a, b) => (a.priorityLevel - b.priorityLevel) * orderFactor);
    }

    const total = await this.projectRepository.countDocuments();

    return {
      total,
      projects,
    };
  }

  async findOne(id: string) {
    return await this.projectRepository.findOne(id);
  }

  async findProjectByExternalId(externalId: string) {
    return await this.projectRepository.findProjectByExternalId(externalId);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectRepository.update(id, updateProjectDto);
  }

  async delete(id: string) {
    return await this.projectRepository.delete(id);
  }
}
