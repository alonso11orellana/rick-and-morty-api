import { Response } from 'express';
import { EMPTY_LOCATION, KEYS_TO_DELETE_DICT, ZERO_EPISODES } from '../infrastructure/constants/business.constants';
import { NOT_FOUND_ERROR } from '../infrastructure/constants/errors.constants';
import { CharacterInterface } from '../interfaces/character.interface';
import { CharacterDataApiInterface } from '../interfaces/characterApiResponse.interface';
import { LocationDataApiInterface } from '../interfaces/locationApiResponse.interface';

import CharactersServices from '../services/characters.services';
import LocationsServices from '../services/locations.services';
import Utils from '../utils/utils';

class CharactersLogic {

    public static async getCharacter(id: number, res: Response): Promise<void | CharacterInterface> {
        try {
            const character = await CharactersServices.getCharacter(id);
            if (!character) throw NOT_FOUND_ERROR;
            const urlLocation = character.origin.url;
            const location = urlLocation ? await LocationsServices.getLocation(urlLocation) : EMPTY_LOCATION;
            return this.mapCharacter(character, location);
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    }

    private static mapCharacter(character: CharacterDataApiInterface, location: LocationDataApiInterface): CharacterInterface {
        const { dimension, residents } = location;
        const { name, url } = character.origin;
        const episodeCount = this.getEpisodeCount(character);
        character = Utils.deleteExtraDataFromObject(character, KEYS_TO_DELETE_DICT);
        return {
            ...character,
            episodeCount,
            origin: {
                name,
                url,
                dimension,
                residents
            }
        } as CharacterInterface;
    }

    private static getEpisodeCount(character: CharacterDataApiInterface): number {
        return character.episode ? character.episode.length : ZERO_EPISODES;
    }
}
export default CharactersLogic;