import knex from "knex";

const useConnection = () => {
    const connection = knex({
        client: "better-sqlite3",
        connection: {
            filename: "./data/db.sqlite3",
        },
        useNullAsDefault: true,
    });

    connection.on("query", ({ sql, bindings }) => {
        // console.warn("[db]: ", data?.sql);
        // if (data?.bindings) console.warn("[db bindings]: ", data?.bindings);
        const query = connection.raw(sql, bindings).toQuery();
        console.warn("[db]", query);
    });

    return {
        connection,
    };
};

export default useConnection;
