class Utils {
    public static deleteExtraDataFromObject(object: any, keysToDelete: string[]) {
        keysToDelete.forEach((key: string) => delete object[key])
        return object;
    }
}

export default Utils;