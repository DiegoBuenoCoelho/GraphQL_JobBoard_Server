import knex from "knex";

const useConnection = () => {
    const connection = knex({
        client: "better-sqlite3",
        connection: {
            filename: "./data/db.sqlite3",
        },
        useNullAsDefault: true,
    });

    connection.on("query", (data) => {
        console.warn("[db]: ", data?.sql);
        if (data?.bindings) console.warn("[db bindings]: ", data?.bindings);
    });

    return {
        connection,
    };
};

export default useConnection;
