import * as printersService from '../../src/services/printers-service';
import * as printersDao from '../../src/daos/printers-dao';
import { Printer } from '../../src/models/printer';

jest.mock("../../src/daos/printers-dao");

const mockPrintersDao = printersDao as any;

describe('savePrinter', () => {
    test('will return 422, lacking sn', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('It calls this line specifically?');
        });

        const payload = {
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking clientId', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('What is your first name?');
        });

        const payload = {
            sn: 437235,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking make', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('What is your last name?');
        });

        const payload = {
            sn: 437235,
            clientId: 13,
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking model', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('Another fine console log.');
        });

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            locInBuilding: "Computers",
            status: "working"
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking locInBuilding', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('No email to insert');
        });

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            status: "working"
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking status', async () => {
        expect.assertions(1);
        mockPrintersDao.savePrinter.mockImplementation(() => {
            console.log('No email to insert');
        });

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
        }

        try {
            await printersService.savePrinter(payload);
            fail('Expected error not thrown by printersService.savePrinter');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Printer object', async () => {
        mockPrintersDao.savePrinter.mockImplementation(o => o);

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        };

        const result = await printersService.savePrinter(payload);
        expect(payload).not.toBeInstanceOf(Printer);
        expect(result).toBeInstanceOf(Printer);
    });

    test('Input has a field not found in output', async () => {
        mockPrintersDao.savePrinter.mockImplementation(o => o);

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working",
            printedParadise: true
        };

        const result = await printersService.savePrinter(payload) as any;
        expect(result.printedParadise).not.toBeDefined();
    });
});

describe("patchPrinter", () => {
    test("successful patch", async () => {
        expect.assertions(1);
        mockPrintersDao.patchPrinter.mockImplementation(() => ({}));

        const payload = {
            sn: 437235,
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        };

        const result = await printersService.patchPrinter(payload);
        expect(result).toBeTruthy();
    });

    test("sn required for successful patch", async () => {
        expect.assertions(1);
        mockPrintersDao.patchPrinter.mockImplementation(() => ({}));

        const payload = {
            clientId: 13,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        };

        try {
            const result = await printersService.patchPrinter(payload);
            fail();
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });
});
