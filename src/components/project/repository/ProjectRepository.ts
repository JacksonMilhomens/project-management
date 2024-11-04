import { Types } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entity/Project';
import { Paginate } from 'src/utils/Paginate';

export abstract class ProjectRepository {
  abstract create(createProjectDto: CreateProjectDto): Promise<Types.ObjectId>;
  abstract findAll(paginate: Paginate, sortBy?: string, order?: string): Promise<Project[]>;
  abstract findOne(id: string): Promise<Project>;
  abstract findProjectByExternalId(externalId: string): Promise<Project>;
  abstract update(id: string, updateProjectDto: UpdateProjectDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract countDocuments(): Promise<number>;
  abstract getSequence(): Promise<number>;
}
