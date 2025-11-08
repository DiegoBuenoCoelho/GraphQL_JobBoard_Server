import { getCompany } from "../../db/companies.js";
import { getJobByCompanyId, getJobs } from "../../db/jobs.js";

export const CompanyResolverQuery = {
    company: async (_root, { id }) => {
        return await getCompany(id);
    },
};

export const CompanyResolver = {
    Company: {
        president: () => "JOAOZINHO",
        jobs: (company) => getJobByCompanyId(company.id),
    },
};
