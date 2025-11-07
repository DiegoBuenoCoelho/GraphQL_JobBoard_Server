import knex from "knex";

const useConnection = () => {
    const connection = knex({
        client: "better-sqlite3",
        connection: {
            filename: "./data/db.sqlite3",
        },
        useNullAsDefault: true,
    });

    return {
        connection,
    };
};

export default useConnection;
