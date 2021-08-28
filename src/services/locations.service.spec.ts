import axios from 'axios';
import Exceptions from '../infrastructure/exceptionHandling/exceptions';
import { LocationApiResponseInterface, LocationDataApiInterface } from '../interfaces/locationApiResponse.interface';
import LocationsServices from './locations.services';

jest.mock('axios');

describe('getLocation', () => {
    it('should return location data if service response ok.', async () => {
        const getMock = jest.spyOn(axios, 'get');
        const expected = {
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

        const serviceResponse = {
            data: {
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
            } as LocationDataApiInterface
        } as LocationApiResponseInterface
        getMock.mockResolvedValue(serviceResponse);
        expect(await LocationsServices.getLocation('www')).toEqual(expected);
    });

    it('should call handleError if service return an error.', async () => {
        const getMock = jest.spyOn(axios, 'get');
        const handleErrorMock = jest.spyOn(Exceptions, 'handleError')
        const error = {
            response: {
                status: '404',
                data: 'Not Found'
            }
        }
        getMock.mockRejectedValue(error);
        handleErrorMock.mockReturnValue();
        await LocationsServices.getLocation('www');
        expect(handleErrorMock).toHaveBeenCalledWith({ status: '404', data: 'Not Found' })
    });
});