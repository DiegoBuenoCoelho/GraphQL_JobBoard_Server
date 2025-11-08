import { getCompany } from "../../db/companies.js";
import { getJobs, getJob } from "../../db/jobs.js";

export const JobResolverQuery = {
    job: async (id) => {
        return await getJob(id);
        // return {
        //     id: 34234,
        //     title: "sdfsd",
        //     description: "sdkfjsdfsdjkfhsjkdbfsd",
        // };
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
