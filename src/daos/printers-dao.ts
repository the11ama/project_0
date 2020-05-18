import { db } from "../daos/db";
import { Printer, PrinterRow } from "../models/printer";

export async function getAllPrinters(): Promise<Printer[]> {
    const sql = "SELECT * FROM project_0.printers";

    return db.query<PrinterRow>(sql, []).then((result) => {
        const rows: PrinterRow[] = result.rows;

        console.log(rows);

        const printer: Printer[] = rows.map((row) => Printer.from(row));
        return printer;
    });
}

export async function getPrinterBySn(sn: number): Promise<Printer> {
    const sql = "SELECT * FROM project_0.printers WHERE sn = $1";

    return db
        .query<PrinterRow>(sql, [sn])
        .then((result) => result.rows.map((row) => Printer.from(row))[0]);
}


export async function printerExists(printerSn: number): Promise<boolean> {
    const sql = `SELECT EXISTS(SELECT sn FROM project_0.printers WHERE sn = $1);`;
    const result = await db.query<Exists>(sql, [printerSn]);
    return result.rows[0].exists;
}

export async function savePrinter(printer: Printer): Promise<Printer> {
    const sql = `INSERT INTO project_0.printers (sn, client_id, make, model, loc_in_building, status) \
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    return db
        .query<PrinterRow>(sql, [
            printer.sn,
            printer.clientId,
            printer.make,
            printer.model,
            printer.locInBuilding,
            printer.status,
        ])
        .then((result) => result.rows.map((row) => Printer.from(row))[0]);
}

export async function patchPrinter(printer: Printer): Promise<Printer> {

    const sql = `UPDATE project_0.printers SET sn = COALESCE($1, sn), client_id = COALESCE($2, client_id), \
                make = COALESCE($3, make), model = COALESCE($4, model), \
                loc_in_building = COALESCE($5, loc_in_building), \
                status = COALESCE($6, status) WHERE sn = $1 RETURNING *`;
                

    const params = [printer.sn, printer.clientId, printer.make, printer.model, printer.locInBuilding, printer.status];

    return db
        .query<PrinterRow>(sql, params)
        .then((result) => result.rows.map((row) => Printer.from(row))[0]);
}

interface Exists {
    exists: boolean;
}
