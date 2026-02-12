import { randomUUID } from 'crypto';

const getStatus = oldRegisterGeneralTest => {
    const mapping = {
        1: 'PENDING',
        2: 'IN_PROGRESS',
        3: 'IN_PROGRESS',
        4: 'COMPLETED',
    };

    //console.log('generaltest', oldRegisterGeneralTest);

    return mapping[oldRegisterGeneralTest.state];
};

const getComments = (oldRegisterGeneralTest) => {
    return `${oldRegisterGeneralTest.generalTest.name} ` +
        `${oldRegisterGeneralTest.observations}`
};

//const getMappedExamTask = (newCase, newResolution,
const getMappedGeneralExamTask = (newCase,
    oldRegisterGeneralTest) => {

    return {
        id: randomUUID(),

        caseId: newCase.id,

        name: 'Exámenes',

        administrativeStatus: newCase.administrativeStatus,

        startDate: oldRegisterGeneralTest.dateTest,

        //dueDate: ,
        //reminderDayBefore: ,
        
        status: getStatus(oldRegisterGeneralTest),

        //label: ,
        
        comments: getComments(oldRegisterGeneralTest),

        responsibleOrganizationId: newCase.organizationId,

        //resolutionId: newResolution.id,

        createdAt: oldRegisterGeneralTest.createdAt,
    };
};

export default getMappedGeneralExamTask;
