import useConnection from "./utils/useConnection.js";

const { connection } = useConnection();

const getCompanyTable = () => connection.table("company");

export async function getCompany(id) {
    return await getCompanyTable().first().where({ id });
}
