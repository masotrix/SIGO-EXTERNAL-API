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
    const previousValue = theClinicalNote.content;

    await theClinicalNoteObj.update({
        content: body.content });

    theClinicalNote = theClinicalNoteObj.toJSON()

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: theClinicalNote.caseId } });

    const theCase = theCaseObj.toJSON();

    //console.log('theClinicalNote', theClinicalNote);

    const newHistory =
        await MODULES.history.postEditClinicalNote({

        patientId: theCase.patientId,
        caseId: theCase.id,
        clinicalNoteId: theClinicalNote.id,
        originOrganizationId: theCase.organizationId,
        previousValue,
        newValue: theClinicalNote.content,
    });

    if (newHistory.status === 400) {
        return { status: 400, body: newHistory.body };
    }

    console.log('newHistory', newHistory);

    return { body: theClinicalNote };
}
