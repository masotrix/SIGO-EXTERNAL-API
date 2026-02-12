export default async ({ MODELS }) => {

    const clinicalNoteObjs = await MODELS.clinicalNotes.findAll();

    const clinicalNotes = clinicalNoteObjs.map(
        clinicalNoteObj => clinicalNoteObj.toJSON());

    return { body: clinicalNotes };
}
