import Exceptions from './exceptions';

describe('handleError', () => {
    it('should throw BadRquest.', async () => {
        const error = { data: { error: 'BadRquest'}, status: 400}
        try {
            Exceptions.handleError(error)
        }
        catch(e) {
            expect(e).toEqual({ message: 'BadRquest', status: 400});
        }
    });

    it('should throw InternalServerError.', async () => {
        const error = 'error';
        try {
            Exceptions.handleError(error)
        }
        catch(e) {
            expect(e).toEqual({ message: 'InternalServerError', status: 500});
        }
    });
});