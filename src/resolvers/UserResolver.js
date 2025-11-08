import { faker } from "@faker-js/faker";

export const UserResolverQuery = {
    // me: () => fakeUser(),
};

export const UserResolver = {
    User: {
        // friends: () => [],
    },
};

const fakeUser = () => {
    return {
        name: faker.name.fullName,
    };
};
