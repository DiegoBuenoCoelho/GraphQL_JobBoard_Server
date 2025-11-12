import { customAlphabet } from "nanoid";

const useGenerateIds = () => {
    const ALPHABET =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    const generateId = () => {
        const nanoId = customAlphabet(ALPHABET, 12);
        const idGenerated = nanoId();
        console.log("generateId", { idGenerated });
        return idGenerated;
    };

    return { generateId };
};

export default useGenerateIds;
