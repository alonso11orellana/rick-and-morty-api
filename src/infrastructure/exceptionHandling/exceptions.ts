import { INTERNAL_SERVER_ERROR } from '../constants/errors.constants';

class Exceptions {

    public static handleError(error: any) {
        if (!error?.status || !error?.data) throw INTERNAL_SERVER_ERROR;
        const { status, data } = error;
        throw { status, message: data.error };
    }
}

export default Exceptions;