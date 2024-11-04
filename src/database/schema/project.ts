import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProjectStatus } from '../domain/enums/project-status.enum';
import { Complexity } from '../domain/enums/complexity.enum';

export type ProjectDocument = ProjectModel & Document;

@Schema({ timestamps: true })
export class ProjectModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  department: string;

  @Prop({ required: true, type: String })
  requester: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, enum: ProjectStatus, default: ProjectStatus.BACKLOG })
  status: ProjectStatus;

  @Prop({ required: true, type: String })
  goal: string;

  @Prop({ required: true, type: Boolean })
  impactStakeholders: boolean;

  @Prop({ required: true, enum: Complexity })
  complexity: Complexity;

  @Prop({ required: true, type: Number })
  monthlyRequests: number;

  @Prop({ required: true, type: Number })
  averageTimeSpent: number;

  @Prop({ required: true, type: Date })
  requestDate: Date;

  @Prop({ required: true, type: Number, unique: true })
  sequence: number;

  @Prop({ required: true, type: String, unique: true })
  externalId: string;

  @Prop({ required: false, type: Date })
  createdAt: Date;

  @Prop({ required: false, type: Date })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectModel);
