export class Client {
    clientId: number;
    city: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    buildingAddress: string;

    static from(obj: ClientRow): Client {
        const client = new Client(
            obj.client_id,
            obj.city,
            obj.first_name,
            obj.last_name,
            obj.phone_number,
            obj.email,
            obj.building_address
        )
        return client;
    }

    constructor(
        clientId: number,
        city: number,
        firstName: string,
        lastName: string,
        phoneNumber: string,
        email: string,
        buildingAddress: string
    ) {
        this.clientId = clientId;
        this.city = city;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.buildingAddress = buildingAddress;
    }
}

export interface ClientRow {
    client_id: number;
    city: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    building_address: string;
}
