import { randomUUID } from 'crypto';

const getMappedResolution = (newCase, oldRegisterCommittee) => {

    return {
        id: randomUUID(),

        caseId: newCase.id,

        resolutionId: oldRegisterCommittee.idCommittee,

        comiteDate: oldRegisterCommittee.dateRealization,
    };
};

export default getMappedResolution;
