import * as maintHistoryService from '../../src/services/maint_history-service';
import * as maintHistoryDao from '../../src/daos/maint_history-dao';
import { MaintHistory } from '../../src/models/maint_history';

jest.mock("../../src/daos/maint_history-dao");

const mockMaintHistoryDao = maintHistoryDao as any;

describe('saveMaintHistory', () => {
    test('will return 422, lacking printerId', async () => {
        expect.assertions(1);
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(() => {
            console.log('It calls this line');
        });

        const payload = {
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        }

        try {
            await maintHistoryService.saveMaintHistory(payload);
            fail('Expected error not thrown by maintHistoryService.saveMaintHistory');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking engineCycles', async () => {
        expect.assertions(1);
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(() => {
            console.log('What is your first name?');
        });

        const payload = {
            printerId: 262800,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        }

        try {
            await maintHistoryService.saveMaintHistory(payload);
            fail('Expected error not thrown by maintHistoryService.saveMaintHistory');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking maintPerformed', async () => {
        expect.assertions(1);
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(() => {
            console.log('What is your last name?');
        });

        const payload = {
            printerId: 262800,
            engineCycles: 115731,
            maintDate: "2019-09-18T04:00:00.000Z"
        }

        try {
            await maintHistoryService.saveMaintHistory(payload);
            fail('Expected error not thrown by maintHistoryService.saveMaintHistory');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking maintDate', async () => {
        expect.assertions(1);
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(() => {
            console.log('Another fine console log.');
        });

        const payload = {
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo"
        }

        try {
            await maintHistoryService.saveMaintHistory(payload);
            fail('Expected error not thrown by maintHistoryService.saveMaintHistory');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to MaintHistory object', async () => {
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(o => o);

        const payload = {
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        };

        const result = await maintHistoryService.saveMaintHistory(payload);
        expect(payload).not.toBeInstanceOf(MaintHistory);
        expect(result).toBeInstanceOf(MaintHistory);
    });

    test('Testing by trying to replace assigned ticket', async () => {
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(o => o);

        const payload = {
            ticket: 3,
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        };

        const result = await maintHistoryService.saveMaintHistory(payload);
        expect(result.ticket).not.toBe(payload.ticket);
    });

    test('Input has a field not found in output', async () => {
        mockMaintHistoryDao.saveMaintHistory.mockImplementation(o => o);

        const payload = {
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z",
            fixedItself: true
        };

        const result = await maintHistoryService.saveMaintHistory(payload) as any;
        expect(result.fixedItself).not.toBeDefined();
    });
});

describe("patchMaintHistory", () => {
    test("successful patch", async () => {
        expect.assertions(1);
        mockMaintHistoryDao.patchMaintHistory.mockImplementation(() => ({}));

        const payload = {
            ticket: 3,
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        };

        const result = await maintHistoryService.patchMaintHistory(payload);
        expect(result).toBeTruthy();
    });

    test("ticket required for successful patch", async () => {
        expect.assertions(1);
        mockMaintHistoryDao.patchMaintHistory.mockImplementation(() => ({}));

        const payload = {
            printerId: 262800,
            engineCycles: 115731,
            maintPerformed: "Bypass Sup Vena Cava to L Pulm Art w Zooplastic, Perc Endo",
            maintDate: "2019-09-18T04:00:00.000Z"
        };

        try {
            const result = await maintHistoryService.patchMaintHistory(payload);
            fail();
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });
});
