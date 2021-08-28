import { CharacterDataApiInterface, PlaceInformation } from './characterApiResponse.interface';

export interface CharacterInterface extends Omit<CharacterDataApiInterface, 'origin'> {
    origin: Origin;
}

export interface Origin extends PlaceInformation{
    dimension: string;
    residents: string[];
}