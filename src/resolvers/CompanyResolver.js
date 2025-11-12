import { getCompanies, getCompany } from "../../db/companies.js";
import { getJobByCompanyId } from "../../db/jobs.js";

import { ThrowError_NotFound } from "./_ERRORS_Resolvers.js";

export const CompanyResolverQuery = {
    company: async (_root, { id }) => {
        const company = await getCompany(id);
        if (!company) {
            ThrowError_NotFound(`No Company Found with id [${id}]`);
        }
        return company;
    },

    companies: () => getCompanies(),
};

export const CompanyResolver = {
    Company: {
        president: () => "JOAOZINHO",
        jobs: (company) => getJobByCompanyId(company.id),
    },
};
