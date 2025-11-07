import { customAlphabet } from "nanoid";

const useGenerateIds = () => {
    const ALPHABET =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const generateId = () => {
        return customAlphabet(ALPHABET, 12);
    };

    return { generateId };
};

export default useGenerateIds;
