import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModel, ProjectSchema } from 'src/database/schema/project';
import { ProjectRepository } from './repository/ProjectRepository';
import { ProjectDatabase } from './repository/ProjectDatabase';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectModel.name, schema: ProjectSchema, collection: 'projects' }])],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: ProjectRepository,
      useClass: ProjectDatabase,
    },
  ],
})
export class ProjectModule {}
