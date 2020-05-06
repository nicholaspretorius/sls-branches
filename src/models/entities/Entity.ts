import { Country } from "../countries/Country";
import { Contact } from "../contacts/Contact";

export interface Location {
    lat: number;
    lng: number;
}

export interface Channel {
    channelType: string;
    channelHandle: string;
}

export interface Entity {
    entityId: string;
    userId: string;
    parentId: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    country: Country;
    contacts: Contact[];
    location: Location;
    channels?: Channel[];
    attachment?: any;
    attachmentURL?: string;
}

export interface EntityCreateRequest {
    name: string;
    country: Country;
    contacts: Contact[];
}
