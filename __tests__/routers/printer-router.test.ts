import express from "express";
import bodyParser from "body-parser";
import { printersRouter } from "../../src/routers/printers-router";
import * as printersService from "../../src/services/printers-service";
import request from "supertest";


jest.mock("../../src/services/printers-service");
const mockPrintersService = printersService as any;
const app = express();
app.use(bodyParser.json());
app.use("/printers", printersRouter);

describe("getAllPrinters", () => {
    test("Returns 200", async () => {
        mockPrintersService.getAllPrinters.mockImplementation(async () => []);
        await request(app)
            .get("/printers")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("Returns a 404", async () => {
        mockPrintersService.getAllPrinters.mockImplementation(async () => []);
        await request(app)
            .get("/clients")
            .expect(404);
    })
    test("Returns a 500", async () => {
        mockPrintersService.getAllPrinters.mockImplementation(async () => {
            throw new Error();
        });
        await request(app).get("/printers").expect(500);
    });
});

describe("GET /printers/:sn", () => {
    test("200 should be returned", async () => {
        mockPrintersService.getPrinterBySn.mockImplementation(async () => ({}));

        await request(app)
            .get("/printers/883489")
            .expect(200)
            .expect("content-type", "application/json; charset=utf-8");
    });

    test("404 object not found", async () => {
        mockPrintersService.getPrinterBySn.mockImplementation(async () => 0);

        await request(app).get("/printers/alienprinter").expect(404);
    });

    test("500 internal server error", async () => {
        mockPrintersService.getPrinterBySn.mockImplementation(async () => {
            throw new Error();
        });

        await request(app).get("/printers/999").expect(500);
    });
});

describe("createPrinter", () => {
    test("201 should be returned", async () => {
        mockPrintersService.savePrinter.mockImplementation(async () => ({}));
        const payload = {
            sn: 438545,
            clientId: 14,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        };

        await request(app)
            .post("/printers")
            .send(payload)
            .expect(201)
            .expect("content-type", "application/json; charset=utf-8");
    });
    test("500 returned when there's an error", async () => {
        mockPrintersService.savePrinter.mockImplementation(async () => {
            throw new Error();
        });

        const payload = {
            clientId: 14,
            make: "Mercury",
            model: "Monterey",
            locInBuilding: "Computers",
            status: "working"
        };

        await request(app).post("/printers").send(payload).expect(500);
    });
});
