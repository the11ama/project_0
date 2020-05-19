import express from "express";
import bodyParser from "body-parser";
import { maintHistoryRouter } from "../../src/routers/maint_history-router";
import * as maintHistoryService from "../../src/services/maint_history-service";
import request from "supertest";


jest.mock("../../src/services/maint_history-service");
const mockMaintHistoryService = maintHistoryService as any;
const app = express();
app.use(bodyParser.json());
app.use("/maint_history", maintHistoryRouter);

describe("getAllMaintHistory", () => {
    test("Returns normal, as it should", async () => {
        mockMaintHistoryService.getAllMaintHistory.mockImplementation(async () => []);
        await request(app)
            .get("/maint_history")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("Returns a 404", async () => {
        mockMaintHistoryService.getAllMaintHistory.mockImplementation(async () => []);
        await request(app)
            .get("/printers")
            .expect(404);
    })
    test("Returns a 500", async () => {
        mockMaintHistoryService.getAllMaintHistory.mockImplementation(async () => {
            throw new Error();
        });
        await request(app).get("/maint_history").expect(500);
    });
});

describe("GET /maint_history/:ticket", () => {
    test("200 should be returned", async () => {
        mockMaintHistoryService.getMaintHistoryByTicket.mockImplementation(async () => ({}));

        await request(app)
            .get("/maint_history/12")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });

    test("404 object not found", async () => {
        mockMaintHistoryService.getMaintHistoryByTicket.mockImplementation(async () => 0);

        await request(app).get("/maint_history/nobodyknowsthe").expect(404);
    });

    test("500 internal server error", async () => {
        mockMaintHistoryService.getMaintHistoryByTicket.mockImplementation(async () => {
            throw new Error();
        });

        await request(app).get("/maint_history/999").expect(500);
    });
});

describe("createMaintHistory", () => {
    test("201 should be returned", async () => {
        mockMaintHistoryService.saveMaintHistory.mockImplementation(async () => ({}));
        const payload = {
            printerId: 262880,
            engineCycles: 726739,
            maintPerformed: "Someone done sent the wrong part, had to use power squirrel instead",
            maintDate: "2020-01-25T05:00:00.000Z"
        };

        await request(app)
            .post("/maint_history")
            .send(payload)
            .expect(201)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("500 returned when there's an error", async () => {
        mockMaintHistoryService.saveMaintHistory.mockImplementation(async () => {
            throw new Error();
        });

        const payload = {
            printerId: 262880,
            engineCycles: 726739,
            maintPerformed: "Someone done sent the wrong part, had to use power squirrel instead",
            maintDate: "2020-01-25T05:00:00.000Z"
        };

        await request(app).post("/maint_history").send(payload).expect(500);
    });
});

describe("patchMaintHistory", () => {
    test("200 should be returned", async () => {
        mockMaintHistoryService.patchMaintHistory.mockImplementation(async () => ({}));
        const payload = {
            ticket: 31,
            printerId: 262800,
            engineCycles: 726732,
            maintPerformed: "Someone done sent the wrong part, had to use power squirrel instead",
            maintDate: "2020-01-25T05:00:00.000Z"
        };

        await request(app)
            .patch("/maint_history")
            .send(payload)
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("404 should be returned", async () => {
        mockMaintHistoryService.patchMaintHistory.mockImplementation(async () => ({}));
        const payload = {
            ticket: 31,
            printerId: 262800,
            engineCycles: 726732,
            maintPerformed: "Someone done sent the wrong part, had to use power squirrel instead",
            maintDate: "2020-01-25T05:00:00.000Z"
        };

        await request(app).patch("/maint_history/31").send(payload).expect(404);
    });
    test("500 should be returned", async () => {
        mockMaintHistoryService.patchMaintHistory.mockImplementation(async () => {
            throw new Error();
        });

        const payload = {
            printerId: 262800,
            engineCycles: 726732,
            maintPerformed: "Someone done sent the wrong part, had to use power squirrel instead",
            maintDate: "2020-01-25T05:00:00.000Z"
        };

        await request(app).patch("/maint_history").send(payload).expect(500);
    });
});
