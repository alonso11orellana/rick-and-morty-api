/* tslint:disable */
import Exceptions from '../infrastructure/exceptionHandling/exceptions';
import { LocationApiResponseInterface, LocationDataApiInterface } from '../interfaces/locationApiResponse.interface';

const axios = require('axios');

class LocationsServices {

    public static async getLocation(url: string): Promise<LocationDataApiInterface> {
        return await axios.get(url)
            .then((response: LocationApiResponseInterface) => response.data)
            .catch((error: any) => Exceptions.handleError(error?.response));
    }
}

export default LocationsServices;