import { getCompany } from "../../db/companies.js";
import {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
} from "../../db/jobs.js";
import {
    ThrowError_NotFound,
    ThrowError_Unauthorized,
} from "./_ERRORS_Resolvers.js";

export const JobResolverQuery = {
    job: async (_root, { id }, { user }) => {
        const job = await getJob(id);
        if (!job) {
            ThrowError_NotFound(`No Job Found with id [${id}]`);
        }
        return job;
    },

    jobs: () => getJobs(),
};

export const JobResolverMutation = {
    createJob: async (_root, { input }, { user }) => {
        if (!user) {
            ThrowError_Unauthorized(
                "You don't have authorization for that, my friend!"
            );
        }
        const { title, description } = input;
        return createJob({
            companyId: user.companyId,
            title: title,
            description: description,
        });
    },
    deleteJob: async (_root, { input }, { user }) => {
        if (!user) {
            ThrowError_Unauthorized(
                "You don't have authorization for that, my friend!"
            );
        }
        const { id } = input;
        return await deleteJob(id);
    },
    updateJob: async (_root, { input }, { user }) => {
        if (!user) {
            ThrowError_Unauthorized(
                "You don't have authorization for that, my friend!"
            );
        }
        console.log(`[updateJob] user: `, user);
        const { id, title, description } = input;
        return await updateJob({
            id: id,
            title: title,
            description: description,
            companyId: user.companyId,
        });
    },
};

export const JobResolver = {
    Job: {
        date: (job) => toIsoDate(job.createdAt),
        company: (job) => getCompany(job.companyId),
        cu: (_) => "BUNDA",
    },
};

const toIsoDate = (value) => {
    return value.slice(0, "yyyy-mm-dd".length);
};
