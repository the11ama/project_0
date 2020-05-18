export class Printer {
    sn: number;
    clientId: number;
    make: string;
    model: string;
    locInBuilding: string;
    status: string;

    static from(obj: PrinterRow): Printer {
        const printer = new Printer(
            obj.sn,
            obj.client_id,
            obj.make,
            obj.model,
            obj.loc_in_building,
            obj.status
        )
        return printer;
    }

    constructor(
        sn: number,
        clientId: number,
        make: string,
        model: string,
        locInBuilding: string,
        status: string
    ) {
        this.sn = sn;
        this.clientId = clientId;
        this.make = make;
        this.model = model;
        this.locInBuilding = locInBuilding;
        this.status = status;
    }
}

export interface PrinterRow {
    sn: number;
    client_id: number;
    make: string;
    model: string;
    loc_in_building: string;
    status: string;
}
