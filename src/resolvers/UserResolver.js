import { faker } from "@faker-js/faker";

export const UserResolverQuery = {
    me: () => fakeUser(),
};

export const UserResolver = {
    User: {
        friends: () => {
            const newFriends = [];
            let cont = 0;
            while (cont < 3) {
                newFriends.push(fakeUser());
                cont++;
            }
            return newFriends;
        },
    },
};

const fakeUser = () => {
    return {
        name: faker.person.fullName,
    };
};
