import validate from './validate.js';

export default async ({ body, MODELS, MODULES }) => {

    const validation = await validate({
        body, MODELS, model: 'clinicalNotes' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const theClinicalNoteObj = await MODELS.clinicalNotes.findOne({
        where: { id: body.id } });

    let theClinicalNote = theClinicalNoteObj.toJSON()

    //console.log('theClinicalNote', theClinicalNote);

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: theClinicalNote.caseId } });

    const theCase = theCaseObj.toJSON();

    const newHistory =
        await MODULES.history.postDeleteClinicalNote({

        patientId: theCase.patientId,
        caseId: theClinicalNote.caseId,
        clinicalNoteId: theClinicalNote.id,
        originOrganizationId: theCase.organizationId,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    console.log('newHistory', newHistory);

    return { body: theClinicalNote };
}
