import { Country } from "../countries/Country";
import { Contact } from "../contacts/Contact";

export interface Entity {
    entityId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    country: Country;
    contacts: [Contact];
}

export interface EntityCreateRequest {
    name: string;
    country: Country;
    contacts: [Contact];
}
