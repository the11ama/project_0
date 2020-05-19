import * as clientsService from '../../src/services/clients-service';
import * as clientsDao from '../../src/daos/clients-dao';
import { Client } from '../../src/models/client';

jest.mock("../../src/daos/clients-dao");

const mockClientsDao = clientsDao as any;

describe('saveClient', () => {
    test('will return 422, lacking city', async () => {
        expect.assertions(1);
        mockClientsDao.saveClient.mockImplementation(() => {
            console.log('It calls this line specifically?');
        });

        const payload = {
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        }

        try {
            await clientsService.saveClient(payload);
            fail('Expected error not thrown by clientsService.saveClient');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking firstName', async () => {
        expect.assertions(1);
        mockClientsDao.saveClient.mockImplementation(() => {
            console.log('What is your first name?');
        });

        const payload = {
            city: 98,
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        }

        try {
            await clientsService.saveClient(payload);
            fail('Expected error not thrown by clientsService.saveClient');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('will return 422, lacking lastName', async () => {
        expect.assertions(1);
        mockClientsDao.saveClient.mockImplementation(() => {
            console.log('What is your last name?');
        });

        const payload = {
            city: 98,
            firstName: "Elmer",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        }

        try {
            await clientsService.saveClient(payload);
            fail('Expected error not thrown by clientsService.saveClient');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking buildingAddress', async () => {
        expect.assertions(1);
        mockClientsDao.saveClient.mockImplementation(() => {
            console.log('Another fine console log.');
        });

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com"
        }

        try {
            await clientsService.saveClient(payload);
            fail('Expected error not thrown by clientsService.saveClient');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Will return 422, lacking email', async () => {
        expect.assertions(1);
        mockClientsDao.saveClient.mockImplementation(() => {
            console.log('A duck whistle was used here');
        });

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            buildingAddress: "8020 Rosy Hill Ln"
        }

        try {
            await clientsService.saveClient(payload);
            fail('Expected error not thrown by clientsService.saveClient');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Input object transformed to Client object', async () => {
        mockClientsDao.saveClient.mockImplementation(o => o);

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        };

        const result = await clientsService.saveClient(payload);
        expect(payload).not.toBeInstanceOf(Client);
        expect(result).toBeInstanceOf(Client);
    });

    test('Testing by trying to replace assigned clientId', async () => {
        mockClientsDao.saveClient.mockImplementation(o => o);

        const payload = {
            clientId: 1000,
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        };

        const result = await clientsService.saveClient(payload);
        expect(result.clientId).not.toBe(payload.clientId);
    });

    test('Input has a field not found in output', async () => {
        mockClientsDao.saveClient.mockImplementation(o => o);

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln",
            shotRabbit: true
        };

        const result = await clientsService.saveClient(payload) as any;
        expect(result.shotRabbit).not.toBeDefined();
    });
});

describe("patchClient", () => {
    test("successful patch", async () => {
        expect.assertions(1);
        mockClientsDao.patchClient.mockImplementation(() => ({}));

        const payload = {
            clientId: 12,
            city: 27,
            firstName: "Glenn",
            lastName: "Buckell",
            phoneNumber: "308-522-9025",
            email: "gbuckell1@springer.com",
            buildingAddress: "5 International Alley"
        };

        const result = await clientsService.patchClient(payload);
        expect(result).toBeTruthy();
    });

    test("clientId required for successful patch", async () => {
        expect.assertions(1);
        mockClientsDao.patchClient.mockImplementation(() => ({}));

        const payload = {
            city: 27,
            firstName: "Glenn",
            lastName: "Buckell",
            phoneNumber: "308-522-9025",
            email: "gbuckell1@springer.com",
            buildingAddress: "5 International Alley"
        };

        try {
            const result = await clientsService.patchClient(payload);
            fail();
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });
});
