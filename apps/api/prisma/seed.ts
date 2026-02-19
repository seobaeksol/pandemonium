import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const incidents = [
    {
      title: 'Warehouse Block Arson Pattern',
      incidentType: 'arson',
      severityLevel: 'high',
      status: 'monitoring',
      confidenceScore: 0.91,
      regionCode: 'KR-11-WEST',
      geoCellId: 'KR11-GRID-1452',
      redactionLevel: 'L1_PARTIAL_REDACTED',
      occurredAt: new Date('2026-01-24T02:26:00Z'),
    },
    {
      title: 'Violence cluster in central district',
      incidentType: 'violence',
      severityLevel: 'high',
      status: 'verified',
      confidenceScore: 0.94,
      regionCode: 'KR-11-CENTRAL',
      geoCellId: 'KR11-GRID-3321',
      redactionLevel: 'L0_PUBLIC_SAFE',
      occurredAt: new Date('2026-01-24T02:22:00Z'),
    },
    {
      title: 'Historic comparison alert: +18% violence',
      incidentType: 'analytics',
      severityLevel: 'medium',
      status: 'verified',
      confidenceScore: 0.97,
      regionCode: 'KR-11-ALL',
      geoCellId: 'KR11-GRID-0000',
      redactionLevel: 'L0_PUBLIC_SAFE',
      occurredAt: new Date('2026-01-24T02:05:00Z'),
    },
  ];

  for (const data of incidents) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Enums not generated yet without migration
    await prisma.incident.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
