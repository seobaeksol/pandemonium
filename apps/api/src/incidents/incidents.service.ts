import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: string) {
    const incident = await this.prisma.incident.findUnique({
      where: { id },
      include: {
        events: {
          orderBy: { eventTime: 'desc' },
          take: 1,
        },
      },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    const summary = incident.events[0]?.summary || '';

    return {
      ...this.mapToDto(incident),
      redactionLevel: incident.redactionLevel,
      summary,
    };
  }

  async findTimeline(incidentId: string) {
    await this.ensureExists(incidentId);

    const events = await this.prisma.incidentEvent.findMany({
      where: { incidentId },
      orderBy: { eventTime: 'asc' },
    });

    return {
      incidentId,
      events: events.map((e) => ({
        id: e.id,
        eventType: e.eventType,
        title: e.triggerType,
        summary: e.summary,
        eventTime: e.eventTime.toISOString(),
      })),
    };
  }

  async findEvidence(incidentId: string) {
    await this.ensureExists(incidentId);

    const items = await this.prisma.evidenceItem.findMany({
      where: { incidentId },
      include: {
        source: {
          select: { name: true },
        },
      },
      orderBy: [{ reliabilityScore: 'desc' }, { collectedAt: 'desc' }],
    });

    return {
      incidentId,
      items: items.map((e) => ({
        id: e.id,
        evidenceType: e.evidenceType,
        description: e.description,
        reliabilityScore: e.reliabilityScore,
        sourceId: e.sourceId,
        sourceName: e.source.name,
        collectedAt: e.collectedAt.toISOString(),
      })),
    };
  }

  async findSources(incidentId: string) {
    await this.ensureExists(incidentId);

    const groups = await this.prisma.evidenceItem.groupBy({
      by: ['sourceId'],
      where: { incidentId },
      _max: { collectedAt: true },
      _count: { _all: true },
    });

    if (groups.length === 0) {
      return { incidentId, sources: [] };
    }

    const sourceIds = groups.map((g) => g.sourceId);
    const sources = await this.prisma.source.findMany({
      where: { id: { in: sourceIds } },
    });

    const sourceMap = new Map(sources.map((s) => [s.id, s]));

    return {
      incidentId,
      sources: groups.map((g) => {
        const src = sourceMap.get(g.sourceId);
        return {
          id: src?.id,
          name: src?.name,
          trustTier: src?.trustTier,
          lastCheckedAt: g._max.collectedAt?.toISOString(),
          note: `Matched items: ${g._count._all}`,
        };
      }),
    };
  }

  private async ensureExists(id: string) {
    const count = await this.prisma.incident.count({ where: { id } });
    if (count === 0) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
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
