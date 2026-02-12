import { randomUUID } from 'crypto';

const getStatus = oldRegisterTest => {
    const mapping = {
        1: 'PENDING',
        2: 'IN_PROGRESS',
        3: 'IN_PROGRESS',
        4: 'COMPLETED',
    };

    //console.log('generaltest', oldRegisterGeneralTest);

    return mapping[oldRegisterTest.state];
};

const getComments = (oldRegisterTest) => {
    return `${oldRegisterTest.test.name} ` +
        `${oldRegisterTest.observations}`
};

//const getMappedExamTask = (newCase, newResolution,
const getMappedExamTask = (newCase,
    oldRegisterTest) => {

    return {
        id: randomUUID(),

        caseId: newCase.id,

        name: 'Exámenes',

        administrativeStatus: newCase.administrativeStatus,

        startDate: oldRegisterTest.dateTest,

        //dueDate: ,
        //reminderDayBefore: ,
        
        status: getStatus(oldRegisterTest),

        //label: ,
        
        comments: getComments(oldRegisterTest),

        responsibleOrganizationId: newCase.organizationId,

        //resolutionId: newResolution.id,

        createdAt: oldRegisterTest.createdAt,
    };
};

export default getMappedExamTask;
