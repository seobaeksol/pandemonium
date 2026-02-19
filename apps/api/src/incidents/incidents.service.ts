import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

export interface FindAllParams {
  region?: string;
  from?: string;
  to?: string;
  incidentType?: string[];
  minSeverity?: string;
  minConfidence?: number;
  status?: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class IncidentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: FindAllParams) {
    const {
      region,
      from,
      to,
      incidentType,
      minSeverity,
      minConfidence,
      status,
      page = 1,
      pageSize = 20,
    } = params;

    const where: Prisma.IncidentWhereInput = {};

    if (region) {
      where.regionCode = region;
    }
    if (from || to) {
      where.occurredAt = {};
      if (from) where.occurredAt.gte = new Date(from);
      if (to) where.occurredAt.lte = new Date(to);
    }
    if (incidentType && incidentType.length > 0) {
      where.incidentType = { in: incidentType };
    }
    if (minSeverity) {
      where.severityLevel = minSeverity; 
    }
    if (minConfidence !== undefined) {
      where.confidenceScore = { gte: minConfidence };
    }
    if (status) {
      // @ts-ignore: Assuming valid enum status input for MVP
      where.status = status;
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [items, total] = await Promise.all([
      this.prisma.incident.findMany({
        where,
        skip,
        take,
        orderBy: { occurredAt: 'desc' },
      }),
      this.prisma.incident.count({ where }),
    ]);

    return {
      items: items.map(this.mapToDto),
      page,
      pageSize,
      total,
    };
  }

  private mapToDto(incident: any) {
    return {
      id: incident.id,
      title: incident.title,
      incidentType: incident.incidentType,
      severityLevel: incident.severityLevel,
      status: incident.status,
      confidenceScore: incident.confidenceScore,
      regionCode: incident.regionCode,
      geoCellId: incident.geoCellId,
      occurredAt: incident.occurredAt.toISOString(),
      updatedAt: incident.lastUpdatedAt.toISOString(),
    };
  }
}
