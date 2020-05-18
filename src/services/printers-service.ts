import { Printer } from "../models/printer";
import * as printersDao from '../daos/printers-dao';

export function getAllPrinters(): Promise<Printer[]> {
    return printersDao.getAllPrinters();
}

export function getPrinterBySn(sn: number): Promise<Printer> {
    return printersDao.getPrinterBySn(sn);
}

export function savePrinter(printer: any): Promise<Printer> {
    const newPrinter = new Printer(
        printer.sn,
        printer.clientId,
        printer.make,
        printer.model,
        printer.locInBuilding,
        printer.status
    );

    if(printer.sn && printer.clientId && printer.make &&
        printer.model && printer.locInBuilding && printer.status) {
            return printersDao.savePrinter(newPrinter);
        } else {
            console.warn('no printer by this serial number found');
            return new Promise((resolve, reject) => reject(422));
        }
}

export function patchPrinter(input: any): Promise<Printer> {
    const printer = new Printer(
        input.sn,
        input.client_id,
        input.make,
        input.model,
        input.locInBuilding,
        input.status
    );
    if (!printer.sn) {
        throw new Error("400");
    }
    return printersDao.patchPrinter(printer);
}
