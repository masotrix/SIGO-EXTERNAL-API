import { randomUUID } from 'crypto';

const getTopographyCategory = code => {
    return code.split('.')[0]
}

const getMappedMandatoryNotification = (newCase, oldDiagnosticConfirm) => {

    return {
        id: randomUUID(),

        caseId: newCase.id,

        diagnosticBasis: 'SOLID_TUMOR',

        examType: 'BIOPSY',

        topographyGroup: getTopographyCategory(
            oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.topography?.code),

        topographyCode: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.topography.code,

        topographyDescription: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.topography.name,

        morphology: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.morphology.code,

        morphologyDescription: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.morphology.name,

        behavior: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.behavior.name,

        extension: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.extension?.name,

        differentiationGrade: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.grade.name,

        stagingPrefix: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.tnmPrefix?.name,

        t: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.tnmT?.name,

        n: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.tnmN?.name,

        m: oldDiagnosticConfirm
            ?.confirmSolids[0]
            ?.tnmM?.name,

        //sampleCollectionDate: ???,
        sampleCollectionDate: oldDiagnosticConfirm.assertedDate,
          // Como lo obtengo

        resultDate: oldDiagnosticConfirm.assertedDate,

        notifierName: oldDiagnosticConfirm.practitionerPathologistRun,

        notifierDocumentNumber:
            oldDiagnosticConfirm.practitionerPathologistRun,
            // Como lo obtnego

        //organizationId: newOrganizationsMap[
        //    oldPatient.oncologyPatient
        //    .organization.deisCode],
        organizationId: newCase.organizationId,

        createdAt: oldDiagnosticConfirm.createdAt,
    };
};

export default getMappedMandatoryNotification;
