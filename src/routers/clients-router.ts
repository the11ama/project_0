import express from "express";
import * as clientsService from '../services/clients-service';

export const clientsRouter = express.Router();

clientsRouter.get('', (request, response, next) => {
    clientsService
        .getAllClients()
        .then((client) => {
            response.json(client);
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        })
});

clientsRouter.get('/:clientId', (request, response, next) => {
    const clientId = +request.params.clientId;
    clientsService
        .getClientByClientId(clientId) 
        .then((client) => {
            if (!client) {
                response.sendStatus(404);
            } else {
                response.json(client);
            }
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

clientsRouter.post('', (request, response, next) => {
    const client = request.body;
    clientsService
        .saveClient(client)
        .then((newClient) => {
            response.status(201);
            response.json(newClient);
            next();
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

clientsRouter.patch('', (request, response, next) => {
    const client = request.body;
    clientsService
        .patchClient(client)
        .then((updatedClient) => {
            if (updatedClient) {
                response.json(updatedClient);
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
