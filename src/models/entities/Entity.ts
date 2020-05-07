import { Country } from "../countries/Country";
import { Contact } from "../contacts/Contact";

export interface Address {
    address1: string;
    address2: string;
    areaName: string;
    cityTown: string;
    areaCode: string;
    unitNumber?: string;
}

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
    website: string;
    address?: Address;
    channels?: Channel[];
    attachment?: any;
    attachmentURL?: string;
}

export interface EntityCreateRequest {
    name: string;
    country: Country;
    contacts: Contact[];
}
