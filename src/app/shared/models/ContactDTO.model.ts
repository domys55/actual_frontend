import { AddressDTO } from "./AddressDTO.model";
import { PhoneDTO } from "./PhoneDTO.model";

export interface ContactDTO {
    id: number;
    firstName?: string;
    lastName?: string;
    phoneNumbers: PhoneDTO[];
    addresses: AddressDTO[];
  }
