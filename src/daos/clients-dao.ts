import { db } from "../daos/db";
import { Client, ClientRow } from "../models/client";

export async function getAllClients(): Promise<Client[]> {
    const sql = "SELECT * FROM project_0.clients";

    return db.query<ClientRow>(sql, []).then((result) => {
        const rows: ClientRow[] = result.rows;

        console.log(rows);

        const client: Client[] = rows.map((row) => Client.from(row));
        return client;
    });
}

export async function getClientByClientId(clientId: number): Promise<Client> {
    const sql = "SELECT * FROM project_0.clients WHERE client_id = $1";

    return db
        .query<ClientRow>(sql, [clientId])
        .then((result) => result.rows.map((row) => Client.from(row))[0]);
}


export async function clientExists(clientId: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT client_id FROM project_0.clients WHERE project_0.client_id = $1);`;
    const result = await db.query<Exists>(sql, [clientId]);
    return result.rows[0].exists;
}

export async function saveClient(client: Client): Promise<Client> {
    const sql = `INSERT INTO project_0.clients (city, first_name, last_name, phone_number, email, building_address) \
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    return db
        .query<ClientRow>(sql, [
            client.city,
            client.firstName,
            client.lastName,
            client.phoneNumber,
            client.email,
            client.buildingAddress,
        ])
        .then((result) => result.rows.map((row) => Client.from(row))[0]);
}

export async function patchClient(client: Client): Promise<Client> {

    const sql = `UPDATE project_0.clients SET \
    city = COALESCE($1, city), first_name = COALESCE($2, first_name), \
    last_name = COALESCE($3, last_name), phone_number = COALESCE($4, phone_number), \
    email = COALESCE($5, email), building_address = COALESCE($6, building_address) \
    WHERE client_id = $7 RETURNING *`;

    const params = [client.firstName, client.lastName, client.phoneNumber, client.email, client.buildingAddress];

    return db
        .query<ClientRow>(sql, params)
        .then((result) => result.rows.map((row) => Client.from(row))[0]);
}

interface Exists {
    exists: boolean;
}