import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { Trim } from 'src/config/validators/trim';

export class CreateProjectDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Trim()
  department: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Trim()
  requester: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Trim()
  description?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  goal: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  impactStakeholders: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  complexity: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  monthlyRequests: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  averageTimeSpent: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDateString()
  requestDate: Date;
}
