import { Client } from "../models/client";
import * as clientsDao from '../daos/clients-dao';

export function getAllClients(): Promise<Client[]> {
    return clientsDao.getAllClients();
}

export function getClientByClientId(clientId: number): Promise<Client> {
    return clientsDao.getClientByClientId(clientId);
}

export function saveClient(client: any): Promise<Client> {
    const newClient = new Client(
        undefined,
        client.city,
        client.firstName,
        client.lastName,
        client.phoneNumber,
        client.email,
        client.buildingAddress
    );

    if (client.city && client.firstName && client.lastName &&
        client.phoneNumber && client.email && client.buildingAddress) {
        return clientsDao.saveClient(newClient);
    } else {
        console.warn('no client by this ID found');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchClient(input: any): Promise<Client> {
    const client = new Client(
        input.clientId,
        input.city,
        input.fistName,
        input.lastName,
        input.phoneNumber,
        input.email,
        input.buildingAddress
    );
    if (!client.clientId) {
        throw new Error("400");
    }
    return clientsDao.patchClient(client);
}
