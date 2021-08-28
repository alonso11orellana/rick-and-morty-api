export interface CharacterApiResponseInterface {
    data: CharacterDataApiInterface;
}

export interface CharacterDataApiInterface {
    id: number,
    name: string,
    status: string;
    type: string;
    gender?: string;
    species: string;
    origin: PlaceInformation;
    location?: PlaceInformation;
    image?: string;
    episode?: string[];
    url?: string;
    created?: string;
}

export interface PlaceInformation {
    name: string;
    url: string;
}