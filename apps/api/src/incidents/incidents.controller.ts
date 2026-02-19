import { Controller, Get, Query, Param } from '@nestjs/common';
import { IncidentsService } from './incidents.service';

@Controller('api/v1/incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  async findAll(
    @Query('region') region?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('incidentType') incidentType?: string | string[],
    @Query('minSeverity') minSeverity?: string,
    @Query('minConfidence') minConfidence?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const typeArray = Array.isArray(incidentType)
      ? incidentType
      : incidentType
        ? [incidentType]
        : undefined;

    return this.incidentsService.findAll({
      region,
      from,
      to,
      incidentType: typeArray,
      minSeverity,
      minConfidence: minConfidence ? parseFloat(minConfidence) : undefined,
      status,
      page: page ? parseInt(page, 10) : 1,
      pageSize: pageSize ? parseInt(pageSize, 10) : 20,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Get(':id/timeline')
  async findTimeline(@Param('id') id: string) {
    return this.incidentsService.findTimeline(id);
  }

  @Get(':id/evidence')
  async findEvidence(@Param('id') id: string) {
    return this.incidentsService.findEvidence(id);
  }

  @Get(':id/sources')
  async findSources(@Param('id') id: string) {
    return this.incidentsService.findSources(id);
  }
}
