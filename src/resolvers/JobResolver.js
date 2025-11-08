import { getCompany } from "../../db/companies.js";
import { getJobs, getJob } from "../../db/jobs.js";

export const JobResolverQuery = {
    job: async (_root, { id }) => {
        return await getJob(id);
    },

    jobs: () => getJobs(),
};

export const JobResolver = {
    Job: {
        date: (job) => toIsoDate(job.createdAt),
        meuTimao2: () => {
            return {
                name: "Fluminense",
                city: "Kissimmee",
            };
        },
        company: (job) => getCompany(job.companyId),
    },
};

const toIsoDate = (value) => {
    return value.slice(0, "yyyy-mm-dd".length);
};
