import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entity/Project';
import { ProjectRepository } from './ProjectRepository';
import { ProjectDocument, ProjectModel } from 'src/database/schema/project';
import { Paginate } from 'src/utils/Paginate';

@Injectable()
export class ProjectDatabase implements ProjectRepository {
  constructor(@InjectModel(ProjectModel.name) private readonly projectModel: Model<ProjectDocument>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Types.ObjectId> {
    return (await this.projectModel.create(createProjectDto)).id;
  }

  async findAll(paginate: Paginate, sortBy?: string, order: 'asc' | 'desc' = 'asc'): Promise<Project[]> {
    const sortOptions = {};

    if (sortBy) {
      sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    }

    const projectsData = await this.projectModel
      .find()
      .sort(sortOptions)
      .skip(paginate.getOffset())
      .limit(paginate.getLimit());

    return projectsData.map((project) => {
      return new Project(
        project.id,
        project.name,
        project.department,
        project.requester,
        project.description,
        project.status,
        project.goal,
        project.impactStakeholders,
        project.complexity,
        project.monthlyRequests,
        project.averageTimeSpent,
        project.requestDate,
        project.createdAt,
        project.updatedAt,
      );
    });
  }

  async findOne(id: string): Promise<Project> {
    const projectData = await this.projectModel.findOne({ _id: id });
    if (!projectData) {
      throw new HttpException(`Project with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return new Project(
      projectData.id,
      projectData.name,
      projectData.department,
      projectData.requester,
      projectData.description,
      projectData.status,
      projectData.goal,
      projectData.impactStakeholders,
      projectData.complexity,
      projectData.monthlyRequests,
      projectData.averageTimeSpent,
      projectData.requestDate,
      projectData.createdAt,
      projectData.updatedAt,
    );
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<void> {
    const projectData = await this.projectModel.findOne({ _id: id });
    if (!projectData) {
      throw new HttpException(`Project with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.projectModel.updateOne({ _id: id }, updateProjectDto);
  }

  async delete(id: string): Promise<void> {
    const projectData = await this.projectModel.findOne({ _id: id });
    if (!projectData) {
      throw new HttpException(`Project with id ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.projectModel.deleteOne({ _id: id });
  }

  async countDocuments(): Promise<number> {
    return this.projectModel.countDocuments();
  }
}
