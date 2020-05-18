import express from "express";
import * as printersService from '../services/printers-service';

export const printersRouter = express.Router();

printersRouter.get('', (request, response, next) => {
  printersService
    .getAllPrinters()
    .then((printer) => {
        if (!printer) {
            response.sendStatus(404);
        } else {
            response.json(printer);
        }
        next();
    })
    .catch((err) => {
        response.sendStatus(500);
        next();
    })
});

printersRouter.get('/:sn', (request, response, next) => {
    const sn = +request.params.sn;
    printersService
        .getPrinterBySn(sn)
        .then((printer) => {
            if (!printer) {
                response.sendStatus(404);
            } else {
                response.json(printer);
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

printersRouter.post('', (request, response, next) => {
    const printer = request.body;
    printersService
        .savePrinter(printer)
        .then((newPrinter) => {
            response.status(201);
            response.json(newPrinter);
            next();
        })
        .catch((err) => {
            response.sendStatus(500);
            next();
        });
});

printersRouter.patch('', (request, response, next) => {
    const printer = request.body;
    printersService
        .patchPrinter(printer)
        .then((updatedPrinter) => {
            if (updatedPrinter) {
                response.json(updatedPrinter);
            } else {
                response.sendStatus(404);
            }
        })
        .catch((err) => {
            response.sendStatus(500);
        })
        .finally(() => {
            next();
        });
});
