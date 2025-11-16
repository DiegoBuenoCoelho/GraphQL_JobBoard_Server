import { ThrowError_Unauthorized } from "./../src/resolvers/_ERRORS_Resolvers.js";
import useConnection from "./utils/useConnection.js";
import useGenerateIds from "./utils/useGenerateIds.js";

const { connection } = useConnection();
const getJobTable = () => connection.table("job");
const obGenerateId = useGenerateIds();

export async function getJobs() {
    const jobs = await getJobTable().select().orderBy("createdAt", "desc");
    // console.log({ jobs });
    return jobs;
}

export async function getJob(id) {
    return await getJobTable().first().where({ id });
}

export async function getJobByCompanyId(companyId) {
    return await getJobTable().select().where({ companyId });
}

export async function createJob({ companyId, title, description }) {
    const newId = obGenerateId.generateId();
    console.log("createJob ==>", { newId, companyId, title, description });
    const job = {
        id: newId,
        companyId,
        title,
        description,
        createdAt: new Date().toISOString(),
    };
    await getJobTable().insert(job);
    return job;
}

export async function deleteJob(id, companyId) {
    const job = await getJobTable().first().where({ id });
    if (!job) {
        throw new Error(`Job not found: ${id}`);
    } else if (job.companyId !== companyId) {
        ThrowError_Unauthorized("Burlando DELETE, neh safado!?");
    }
    await getJobTable().delete().where({ id });
    return job;
}

export async function updateJob({ id, title, description, companyId }) {
    const job = await getJobTable().first().where({ id });
    if (!job) {
        throw new Error(`Job not found: ${id}`);
    } else if (job.companyId !== companyId) {
        ThrowError_Unauthorized("Burlando UPDATE, neh safado!?");
    }
    const updatedFields = { title, description };
    await getJobTable().update(updatedFields).where({ id });
    return { ...job, ...updatedFields };
}
