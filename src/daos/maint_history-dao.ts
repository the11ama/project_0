import { db } from "../daos/db";
import { MaintHistory, MaintHistoryRow } from "../models/maint_history";

export async function getAllMaintHistory(): Promise<MaintHistory[]> {
    const sql = "SELECT * FROM project_0.maint_history";

    return db.query<MaintHistoryRow>(sql, []).then((result) => {
        const rows: MaintHistoryRow[] = result.rows;

        console.log(rows);

        const maintHistory: MaintHistory[] = rows.map((row) => MaintHistory.from(row));
        return maintHistory;
    });
}

export async function getMaintHistoryByTicket(ticket: number): Promise<MaintHistory> {
    const sql = "SELECT * FROM project_0.maint_history WHERE ticket = $1";

    return db
        .query<MaintHistoryRow>(sql, [ticket])
        .then((result) => result.rows.map((row) => MaintHistory.from(row))[0]);
}


export async function maintHistoryExists(ticket: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT ticket FROM project_0.maint_history WHERE ticket = $1);`;
    const result = await db.query<Exists>(sql, [ticket]);
    return result.rows[0].exists;
}

export async function saveMaintHistory(maintHistory: MaintHistory): Promise<MaintHistory> {
    const sql = `INSERT INTO project_0.maint_history (printer_id, engine_cycles, maint_performed, maint_date) \
                VALUES ($1, $2, $3, $4) RETURNING *`;

    return db
        .query<MaintHistoryRow>(sql, [
            maintHistory.printerId,
            maintHistory.engineCycles,
            maintHistory.maintPerformed,
            maintHistory.maintDate.toISOString(),
        ])
        .then((result) => result.rows.map((row) => MaintHistory.from(row))[0]);
}

export async function patchMaintHistory(maintHistory: MaintHistory): Promise<MaintHistory> {

    const sql = `UPDATE project_0.maint_history SET printer_id = COALESCE($1, printer_id), \
                engine_cycles = COALESCE($2, engine_cycles), maint_performed = COALESCE($3, maint_performed), \
                maint_date = COALESCE($4, maint_date) WHERE ticket = $5 RETURNING *`;

    const maintDate = maintHistory.maintDate && maintHistory.maintDate.toISOString();

    const params = [maintHistory.ticket, maintHistory.engineCycles, maintHistory.maintPerformed, maintDate];

    return db
        .query<MaintHistoryRow>(sql, params)
        .then((result) => result.rows.map((row) => MaintHistory.from(row))[0]);
}

interface Exists {
    exists: boolean;
}
