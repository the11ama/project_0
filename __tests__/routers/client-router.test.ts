import express from "express";
import bodyParser from "body-parser";
import { clientsRouter } from "../../src/routers/clients-router";
import * as clientsService from "../../src/services/clients-service";
import request from "supertest";


jest.mock("../../src/services/clients-service");
const mockClientsService = clientsService as any;
const app = express();
app.use(bodyParser.json());
app.use("/clients", clientsRouter);

describe("getAllClients", () => {
    test("Returns normal, as is the tradition", async () => {
        mockClientsService.getAllClients.mockImplementation(async () => []);
        await request(app)
            .get("/clients")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("Returns a 500, maybe", async () => {
        mockClientsService.getAllClients.mockImplementation(async () => {
            throw new Error();
        });
        await request(app).get("/clients").expect(500);
    });
});

describe("GET /clients/:client_id", () => {
    test("200 should be returned", async () => {
        mockClientsService.getClientByClientId.mockImplementation(async () => ({}));

        await request(app)
            .get("/clients/12")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });

    test("404 object not found", async () => {
        mockClientsService.getClientByClientId.mockImplementation(async () => 0);

        await request(app).get("/clients/nobodyknowsthe").expect(404);
    });

    test("500 internal server error", async () => {
        mockClientsService.getClientByClientId.mockImplementation(async () => {
            throw new Error();
        });

        await request(app).get("/clients/999").expect(500);
    });
});

describe("createClient", () => {
    test("201 should be returned", async () => {
        mockClientsService.saveClient.mockImplementation(async () => ({}));
        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln"
        };

        await request(app)
            .post("/clients")
            .send(payload)
            .expect(201)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("500 returned when there's an error", async () => {
        mockClientsService.saveClient.mockImplementation(async () => {
            throw new Error();
        });

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln",
        };

        await request(app).post("/clients").send(payload).expect(500);
    });
});

describe("patchClient", () => {
    test("200 should be returned", async () => {
        mockClientsService.patchClient.mockImplementation(async () => ({}));
        const payload = {
            clientId: 22,
            city: 114,
            firstName: "Addy",
            lastName: "Jeannin",
            phoneNumber: "581-282-6053",
            email: "ajeannin2@nationalgeographic.com",
            buildingAddress: "08 Fordem Trail"
        };

        await request(app)
            .patch("/clients")
            .send(payload)
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("404 should be returned", async () => {
        mockClientsService.patchClient.mockImplementation(async () => undefined);
        const payload = {
            clientId: 13,
            city: 114,
            firstName: "Addy",
            lastName: "Jeannin",
            phoneNumber: "581-282-6053",
            email: "ajeannin2@nationalgeographic.com",
            buildingAddress: "08 Fordem Trail"
        };

        await request(app).patch("/clients").send(payload).expect(404);
    });
    test("500 should be returned", async () => {
        mockClientsService.patchClient.mockImplementation(async () => {
            throw new Error();
        });

        const payload = {
            city: 98,
            firstName: "Elmer",
            lastName: "Fudd",
            phoneNumber: "905-886-9025",
            email: "efudd40@aol.com",
            buildingAddress: "8020 Rosy Hill Ln",
        };

        await request(app).patch("/clients").send(payload).expect(500);
    });
});
