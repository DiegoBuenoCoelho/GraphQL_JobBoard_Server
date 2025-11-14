import { GraphQLError } from "graphql";

export const ThrowError_NotFound = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: `CUSTOM_NOT_FOUND`,
        },
    });
};

export const ThrowError_Unauthorized = (message) => {
    throw new GraphQLError(message, {
        extensions: {
            code: `CUSTOM_UNAUTHORIZED`,
        },
    });
};
