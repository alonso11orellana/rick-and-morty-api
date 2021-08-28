import axios from 'axios';
import Exceptions from '../infrastructure/exceptionHandling/exceptions';
import { CharacterApiResponseInterface, CharacterDataApiInterface } from '../interfaces/characterApiResponse.interface';
import CharactersServices from './characters.services';

jest.mock('axios');

describe('getCharacter', () => {

    const getSpyOn = jest.spyOn(axios, 'get');

    it('should return character data if service response ok.', async () => {
        const expected = {
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
        } as CharacterDataApiInterface

        const serviceResponse = {
            data: {
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
            } as CharacterDataApiInterface
        } as CharacterApiResponseInterface;
        getSpyOn.mockResolvedValue(serviceResponse);
        expect(await CharactersServices.getCharacter(2)).toEqual(expected);
        expect(getSpyOn).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/2')
    });

    it('should call handleError if service return an error.', async () => {
        const handleErrorSpyOn = jest.spyOn(Exceptions, 'handleError')
        const error = {
            response: {
                status: '404',
                data: 'Not Found'
            }
        }
        getSpyOn.mockRejectedValue(error);
        handleErrorSpyOn.mockReturnValue();
        await CharactersServices.getCharacter(2);
        expect(handleErrorSpyOn).toHaveBeenCalledWith(error.response)
    });
});