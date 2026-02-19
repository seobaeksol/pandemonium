import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';

describe('IncidentsController', () => {
  let controller: IncidentsController;

  const incidentsServiceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findTimeline: jest.fn(),
    findEvidence: jest.fn(),
    findSources: jest.fn(),
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

  describe('findOne', () => {
    it('calls service.findOne with id', async () => {
      const mockResult = { id: '123', title: 'Test Incident' };
      incidentsServiceMock.findOne.mockResolvedValue(mockResult);

      const result = await controller.findOne('123');

      expect(result).toBe(mockResult);
      expect(incidentsServiceMock.findOne).toHaveBeenCalledWith('123');
    });
  });

  describe('findTimeline', () => {
    it('calls service.findTimeline with id', async () => {
      const mockResult = { incidentId: '123', events: [] };
      incidentsServiceMock.findTimeline.mockResolvedValue(mockResult);

      const result = await controller.findTimeline('123');

      expect(result).toBe(mockResult);
      expect(incidentsServiceMock.findTimeline).toHaveBeenCalledWith('123');
    });
  });

  describe('findEvidence', () => {
    it('calls service.findEvidence with id', async () => {
      const mockResult = { incidentId: '123', items: [] };
      incidentsServiceMock.findEvidence.mockResolvedValue(mockResult);

      const result = await controller.findEvidence('123');

      expect(result).toBe(mockResult);
      expect(incidentsServiceMock.findEvidence).toHaveBeenCalledWith('123');
    });
  });

  describe('findSources', () => {
    it('calls service.findSources with id', async () => {
      const mockResult = { incidentId: '123', sources: [] };
      incidentsServiceMock.findSources.mockResolvedValue(mockResult);

      const result = await controller.findSources('123');

      expect(result).toBe(mockResult);
      expect(incidentsServiceMock.findSources).toHaveBeenCalledWith('123');
    });
  });
});
