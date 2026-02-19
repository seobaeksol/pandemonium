import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';

describe('IncidentsController', () => {
  let controller: IncidentsController;

  const incidentsServiceMock = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidentsController],
      providers: [{ provide: IncidentsService, useValue: incidentsServiceMock }],
    }).compile();

    controller = module.get(IncidentsController);
  });

  describe('findAll', () => {
    it('parses pagination/minConfidence and wraps incidentType string into array', async () => {
      const serviceResult = { items: [], page: 2, pageSize: 10, total: 0 };
      incidentsServiceMock.findAll.mockResolvedValue(serviceResult);

      const result = await controller.findAll(
        'us-ne',
        '2026-01-01T00:00:00.000Z',
        '2026-01-31T23:59:59.999Z',
        'FIRE',
        'HIGH',
        '0.75',
        'OPEN',
        '2',
        '10',
      );

      expect(result).toBe(serviceResult);

      expect(incidentsServiceMock.findAll).toHaveBeenCalledTimes(1);
      expect(incidentsServiceMock.findAll).toHaveBeenCalledWith({
        region: 'us-ne',
        from: '2026-01-01T00:00:00.000Z',
        to: '2026-01-31T23:59:59.999Z',
        incidentType: ['FIRE'],
        minSeverity: 'HIGH',
        minConfidence: 0.75,
        status: 'OPEN',
        page: 2,
        pageSize: 10,
      });

      const params = incidentsServiceMock.findAll.mock.calls[0][0];
      expect(typeof params.page).toBe('number');
      expect(typeof params.pageSize).toBe('number');
      expect(typeof params.minConfidence).toBe('number');
    });

    it('passes incidentType array through and applies default pagination', async () => {
      const serviceResult = { items: [], page: 1, pageSize: 20, total: 0 };
      incidentsServiceMock.findAll.mockResolvedValue(serviceResult);

      const result = await controller.findAll(
        'us-nw',
        undefined,
        undefined,
        ['FIRE', 'FLOOD'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );

      expect(result).toBe(serviceResult);

      expect(incidentsServiceMock.findAll).toHaveBeenCalledTimes(1);
      expect(incidentsServiceMock.findAll).toHaveBeenCalledWith({
        region: 'us-nw',
        from: undefined,
        to: undefined,
        incidentType: ['FIRE', 'FLOOD'],
        minSeverity: undefined,
        minConfidence: undefined,
        status: undefined,
        page: 1,
        pageSize: 20,
      });

      const params = incidentsServiceMock.findAll.mock.calls[0][0];
      expect(typeof params.page).toBe('number');
      expect(typeof params.pageSize).toBe('number');
    });
  });
});
