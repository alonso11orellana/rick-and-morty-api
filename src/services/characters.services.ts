/* tslint:disable */
import { environments } from '../config/environments';
import Exceptions from '../infrastructure/exceptionHandling/exceptions';
import { CharacterApiResponseInterface, CharacterDataApiInterface } from '../interfaces/characterApiResponse.interface';

const axios = require('axios');

class CharactersServices {

    public static async getCharacter(id: number): Promise<CharacterDataApiInterface> {
        const method = 'character';
        return await axios.get(`${environments.rickAndMortyUrl}${method}/${id}`)
            .then((response: CharacterApiResponseInterface) => response.data)
            .catch((error: any) => Exceptions.handleError(error.response));
    }
}

export default CharactersServices;