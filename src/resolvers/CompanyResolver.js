import { getCompany } from "../../db/companies.js";

export const CompanyResolverQuery = {
    company: async (id) => await getCompany(id),
};

export const CompanyResolver = {
    Company: {
        president: () => "JOAOZINHO",
    },
};
