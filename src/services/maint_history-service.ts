import { MaintHistory } from "../models/maint_history";
import * as maintDao from '../daos/maint_history-dao';

export function getAllMaintHistory(): Promise<MaintHistory[]> {
    return maintDao.getAllMaintHistory();
}

export function getMaintHistoryByTicket(ticket: any): Promise<MaintHistory> {
    return maintDao.getMaintHistoryByTicket(ticket);
}

export function saveMaintHistory(maintHistory: any): Promise<MaintHistory> {
    const newMaintHistory = new MaintHistory(
        undefined,
        maintHistory.printerId,
        maintHistory.engineCycles,
        maintHistory.maintPerformed,
        new Date(maintHistory.maintDate)
    );

    if (maintHistory.printerId && maintHistory.engineCycles &&
        maintHistory.maintPerformed && maintHistory.maintDate) {
        return maintDao.saveMaintHistory(newMaintHistory);
    } else {
        console.warn('This ticket is invalid');
        return new Promise((resolve, reject) => reject(422));
    }
}

export function patchMaintHistory(input: any): Promise<MaintHistory> {
    const maintDate = input.maintDate && new Date(input.maintDate);
    const maintHistory = new MaintHistory(
        input.ticket,
        input.printerId,
        input.engineCycles,
        input.maintPerformed,
        maintDate
    );
    if (!maintHistory.ticket) {
        throw new Error("400");
    }
    return maintDao.patchMaintHistory(maintHistory);
}
