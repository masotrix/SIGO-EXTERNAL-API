import { randomUUID } from 'crypto';

const getClosureObservations = oldRegister => {
    const baseObservation = oldRegister.closureObservation;

    if (oldRegister.closureUser) {
        return baseObservation +
            ` Cerrado por ${oldRegister.closureUser}`;
    }

    return baseObservation;
}

//const getMappedMigrationHistory = (newPatient, newCase, newUser, oldRegister) => {
const getMappedMigrationHistory = (newPatient, newCase, oldRegister) => {

    return {
        id: randomUUID(),

        eventType: 'CLOSE_CASE',

        //userId: newUser.id,

        patientId: newPatient.id,

        caseId: newCase.id,

        targetOrganizationId: newPatient.organizationId,

        reason: oldRegister.closureType.name,

        observations: getClosureObservations(oldRegister),
    };
};

export default getMappedMigrationHistory;
