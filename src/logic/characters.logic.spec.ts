import e from 'express';
import { CharacterInterface } from '../interfaces/character.interface';
import { CharacterDataApiInterface } from '../interfaces/characterApiResponse.interface';
import { LocationDataApiInterface } from '../interfaces/locationApiResponse.interface';
import CharactersServices from '../services/characters.services';
import LocationsServices from '../services/locations.services';
import CharactersLogic from './characters.logic';

jest.mock('axios');

describe('getCharacter', () => {
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as e.Response<any, Record<string, any>>;

    let getCharacterResponse: CharacterDataApiInterface;
    let getLocationResponse: LocationDataApiInterface;

    const getCharacterSpyOn = jest.spyOn(CharactersServices, 'getCharacter');
    const getLocationSpyOn = jest.spyOn(LocationsServices, 'getLocation');

    beforeEach(() => {
        jest.clearAllMocks();
        getCharacterResponse = {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/1'
            },
            location: {
                name: 'Earth',
                url: 'https://rickandmortyapi.com/api/location/20'
            },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            episode: [
                'https://rickandmortyapi.com/api/episode/1',
                'https://rickandmortyapi.com/api/episode/2',
            ],
            url: 'https://rickandmortyapi.com/api/character/2',
            created: '2017-11-04T18:50:21.651Z'
        } as CharacterDataApiInterface;

        getLocationResponse = {
            id: 3,
            name: 'Citadel of Ricks',
            type: 'Space station',
            dimension: 'unknown',
            residents: [
                'https://rickandmortyapi.com/api/character/8',
                'https://rickandmortyapi.com/api/character/14',
            ],
            url: 'https://rickandmortyapi.com/api/location/3',
            created: '2017 - 11 - 10T13: 08: 13.191Z'
        } as LocationDataApiInterface;
    });

    it('should return the characters information if all services respond ok.', async () => {
        const expected = {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            origin: {
                name: 'Earth',
                dimension: 'unknown',
                residents: [
                    'https://rickandmortyapi.com/api/character/8',
                    'https://rickandmortyapi.com/api/character/14',
                ],
                url: 'https://rickandmortyapi.com/api/location/1'
            },
            episodeCount: 2
        } as CharacterInterface;

        getCharacterSpyOn.mockResolvedValue(getCharacterResponse);
        getLocationSpyOn.mockResolvedValue(getLocationResponse)
        expect(await CharactersLogic.getCharacter(1, res)).toEqual(expected);
        expect(getCharacterSpyOn).toHaveBeenCalledWith(1)
        expect(getLocationSpyOn).toHaveBeenCalledWith('https://rickandmortyapi.com/api/location/1');
    });

    it('should return the characters info and not call getLocation service if origin url is empty.', async () => {
        getCharacterResponse.origin.url = '';
        const expected = {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            origin: {
                name: 'Earth',
                url: '',
                dimension: undefined,
                residents: undefined
            },
            episodeCount: 2
        };

        getCharacterSpyOn.mockResolvedValue(getCharacterResponse);
        expect(await CharactersLogic.getCharacter(1, res)).toEqual(expected);
        expect(getCharacterSpyOn).toHaveBeenCalledWith(1)
        expect(getLocationSpyOn).not.toHaveBeenCalled();
    });

    it('should send NotFound error if getCharacter service return an empty object.', async () => {
        const errorExpect = 404;
        getCharacterSpyOn.mockResolvedValue(undefined as any);
        await CharactersLogic.getCharacter(1, res);
        expect(res.status).toBeCalledWith(errorExpect);
        expect(res.send).toBeCalledWith('NotFoundError');
    });
});