import { Controller, Get, Query } from '@nestjs/common';
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
}
