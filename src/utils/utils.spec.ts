import Utils from './utils';

describe('deleteExtraDataFromObject', () => {
    const object = {
        a: 'a',
        b: 'b',
        c: 'c'
    }
    it('should return an object without the keys a and b.', async () => {
        const arrayKeysToDelete = ['a', 'b'];
        const expectedObject = { c: 'c' };
        expect(Utils.deleteExtraDataFromObject(object, arrayKeysToDelete)).toEqual(expectedObject)
    });

    it('should return an empty object', async () => {
        const arrayKeysToDelete = ['a', 'b', 'c'];
        expect(Utils.deleteExtraDataFromObject(object, arrayKeysToDelete)).toEqual({})
    });

    it('should return the same object if array is empty', async () => {
        const arrayKeysToDelete: string[] = [];
        expect(Utils.deleteExtraDataFromObject(object, arrayKeysToDelete)).toEqual(object)
    });
});