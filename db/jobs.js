import useConnection from "./utils/useConnection.js";
import useGenerateIds from "./utils/useGenerateIds.js";

const { connection } = useConnection();
const getJobTable = () => connection.table("job");
const obGenerateId = useGenerateIds();

export async function getJobs() {
    return await getJobTable().select();
}

export async function getJob(id) {
    return await getJobTable().first().where({ id });
}

export async function getJobByCompanyId(companyId) {
    return await getJobTable().select().where({ companyId });
}

export async function createJob({ companyId, title, description }) {
    const job = {
        id: obGenerateId.generateId(),
        companyId,
        title,
        description,
        createdAt: new Date().toISOString(),
    };
    await getJobTable().insert(job);
    return job;
}

export async function deleteJob(id) {
    const job = await getJobTable().first().where({ id });
    if (!job) {
        throw new Error(`Job not found: ${id}`);
    }
    await getJobTable().delete().where({ id });
    return job;
}

export async function updateJob({ id, title, description }) {
    const job = await getJobTable().first().where({ id });
    if (!job) {
        throw new Error(`Job not found: ${id}`);
    }
    const updatedFields = { title, description };
    await getJobTable().update(updatedFields).where({ id });
    return { ...job, ...updatedFields };
}
