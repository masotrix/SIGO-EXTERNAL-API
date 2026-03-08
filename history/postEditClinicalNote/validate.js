import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        patientId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'patients' }),

        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        clinicalNoteId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'clinicalNotes' }),

        originOrganizationId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'organizations' }),

        previousValue:
            (field, body) => validations.string({ field, body }),

        newValue:
            (field, body) => validations.string({ field, body }),

        /*
        observations:
            (field, body) => validations.optional({ field, body },
                validations.string({ field, body })),
        */
    };

    const defaultDic = {
        id: randomUUID(),
        eventType: 'EDIT_CLINICAL_NOTE',
        observations: 'EXTERNAL_API',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}




