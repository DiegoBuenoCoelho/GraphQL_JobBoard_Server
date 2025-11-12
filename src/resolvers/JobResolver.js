import { getCompany } from "../../db/companies.js";
import { getJobs, getJob } from "../../db/jobs.js";
import { ThrowError_NotFound } from "./_ERRORS_Resolvers.js";

export const JobResolverQuery = {
    job: async (_root, { id }) => {
        const job = await getJob(id);
        if (!job) {
            ThrowError_NotFound(`No Job Found with id [${id}]`);
        }
        return job;
    },

    jobs: () => getJobs(),
};

export const JobResolver = {
    Job: {
        date: (job) => toIsoDate(job.createdAt),
        // meuTimao2: () => {
        //     return {
        //         name: "Fluminense",
        //         city: "Kissimmee",
        //     };
        // },
        company: (job) => getCompany(job.companyId),
    },
};

const toIsoDate = (value) => {
    return value.slice(0, "yyyy-mm-dd".length);
};
