import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'clinicalNotes' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newClinicalNoteObj = await MODELS.clinicalNotes.create(body);
    const newClinicalNote = newClinicalNoteObj.toJSON();

    const associatedCaseObj = await MODELS.cases.findOne({
        where: { id: newClinicalNote.caseId } });
    const associatedCase = associatedCaseObj.toJSON();

    const newHistory = await MODULES.history.postClinicalNote({
        patientId: associatedCase.patientId,
        caseId: newClinicalNote.caseId,
        originOrganizationId: associatedCase.organizationId,
    });

    //console.log('newHistory', newHistory);

    return { body: newClinicalNote };
}
