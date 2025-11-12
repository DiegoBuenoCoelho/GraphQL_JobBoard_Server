import { createJob } from "../../db/jobs.js";

export const _MutationResolverMutation = {
    createJob: (_root, { title, description }) => {
        const companyId = "Gu7QW9LcnF5d"; //hardcoded at this moment
        // console.log({ companyId, title, description });
        return createJob({
            companyId: companyId,
            title: title,
            description: description,
        });
    },
};
