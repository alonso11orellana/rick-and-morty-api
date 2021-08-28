import { Request, Response, Router } from 'express';
import CharactersLogic from '../logic/characters.logic';

const router =  Router();

router.get('/',  async (req: Request, res: Response) => {
    const id = Number(req.query.id);
    const character = await CharactersLogic.getCharacter(id, res)
    res.json(character);
});

module.exports = router;