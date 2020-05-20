import express from "express";
import * as maintHistoryService from '../services/maint_history-service';

export const maintHistoryRouter = express.Router();

maintHistoryRouter.get('', (request, response, next) => {
    maintHistoryService
        .getAllMaintHistory()
        .then((maintHistory) => {
            response.json(maintHistory);
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
});

maintHistoryRouter.get('/:ticket', (request, response, next) => {
    const ticket = +request.params.ticket;
    maintHistoryService
        .getMaintHistoryByTicket(ticket)
        .then((maintHistory) => {
            if (!maintHistory) {
                response.sendStatus(404);
            } else {
                response.json(maintHistory);
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

maintHistoryRouter.post('', (request, response, next) => {
    const maintHistory = request.body;
    maintHistoryService
        .saveMaintHistory(maintHistory)
        .then((newMaintHistory) => {
            response.status(201);
            response.json(newMaintHistory);
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

maintHistoryRouter.patch('', (request, response, next) => {
    const maintHistory = request.body;
    maintHistoryService
        .patchMaintHistory(maintHistory)
        .then((updatedMaintHistory) => {
            if (updatedMaintHistory) {
                response.json(updatedMaintHistory);
            } else {
                response.sendStatus(404);
            }
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
        })
        .finally(() => {
            next();
        });
});