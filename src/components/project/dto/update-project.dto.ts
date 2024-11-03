import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ProjectStatus } from '../domain/enums/Status';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({ required: true })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
