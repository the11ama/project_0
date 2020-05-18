export class MaintHistory {
    ticket: number;
    printerId: string;
    engineCycles: number;
    maintPerformed: string;
    maintDate: Date;

    static from(obj: MaintHistoryRow): MaintHistory {
        const maintHistory = new MaintHistory(
            obj.ticket,
            obj.printer_id,
            obj.engine_cycles,
            obj.maint_performed,
            obj.maint_date,
        )
        return maintHistory;
    }

    constructor(
        ticket: number,
        printerId: string,
        engineCycles: number,
        maintPerformed: string,
        maintDate: Date
    ) {
        this.ticket = ticket;
        this.printerId = printerId;
        this.engineCycles = engineCycles;
        this.maintPerformed = maintPerformed;
        this.maintDate = maintDate;
    }
}

export interface MaintHistoryRow {
    ticket: number;
    printer_id: string;
    engine_cycles: number;
    maint_performed: string;
    maint_date: Date;
}
