export interface LocationApiResponseInterface {
    data: LocationDataApiInterface;
}

export interface LocationDataApiInterface {
    id: number,
    name: string,
    type: string;
    dimension: string;
    residents: string[];
    created: string;
    url: string;
}
