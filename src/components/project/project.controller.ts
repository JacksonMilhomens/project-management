import { Body, Controller, Get, Param, Post, Put, Delete, Logger, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectPresenter } from './presenter/ProjectPresenter';
import { SortBy } from './domain/enums/SortBy';
import { Order } from './domain/enums/Order';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiBody({
    type: CreateProjectDto,
    description: 'Object used to create a new project',
  })
  @ApiOperation({ summary: 'create a project' })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Parameter (optional)',
    required: false,
  })
  @ApiQuery({
    name: 'itemsPage',
    type: Number,
    description: 'Parameter (optional)',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    enum: Object.values(SortBy),
    description: 'Sort projects by specified attribute',
    required: false,
  })
  @ApiQuery({
    name: 'order',
    enum: Object.values(Order),
    description: 'Order direction',
    required: false,
  })
  @ApiOperation({ summary: 'return all projects' })
  async findAll(
    @Query('page') page?: number,
    @Query('itemsPage') itemsPage?: number,
    @Query('sortBy') sortBy?: SortBy,
    @Query('order') order?: Order,
  ) {
    const data = await this.projectService.findAll(page, itemsPage, sortBy, order);
    return {
      total: data.total,
      projects: data.projects.map((project) => {
        return new ProjectPresenter(project).toJSON();
      }),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a project' })
  async findOne(@Param('id') id: string) {
    const project = await this.projectService.findOne(id);
    const projectPresenter = new ProjectPresenter(project);
    return projectPresenter.toJSON();
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a project' })
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a project' })
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
