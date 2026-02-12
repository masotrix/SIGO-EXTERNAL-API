import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';
import { administrativeStatusV } from '../../cases/post/validate.js';

const statusV = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'DELETED',
];

export default async ({ body, MODELS, model }) => {

    const validationDic = {
        caseId:
            async (field, body) => await validations.exists({
                field, body, MODELS, model: 'cases' }),

        startDate:
            (field, body) => validations.optional({ body },
                validations.date({ field, body })),

        reminderDaysBefore:
            (field, body) => validations.optional({ body },
                validations.integer({ field, body })),

        administrativeStatus:
            (field, body) => validations.optional({ body },
                validations.categorical({ field, body,
                    categories: administrativeStatusV })),

        dueDate:
            (field, body) => validations.optional({ body },
                validations.date({ field, body })),

        status:
            (field, body) => validations.categorical({
                field, body, categories: statusV }),

        comments:
            (field, body) => validations.optional({ body },
                validations.string({ field, body })),

        responsibleOrganizationId:
            async (field, body) => validations.optional({ body },
                await validations.exists({
                    field, body, MODELS, model: 'organizations' })),
    };

    const extraRules = [
        body => validations.requiredIf({
            field1: 'status', value1: 'COMPLETED',
            field2: 'dueDate', body }),

        body => validations.lessDate({
            field1: 'startDate', field2: 'dueDate', body }),

        body => validations.daysBetween({
            field1: 'startDate', field2: 'reminderDaysBefore',
            field3: 'dueDate', body }),
    ];

    const associatedCaseObj =
        await MODELS.cases.findOne({ where: { id: body.caseId } });
    const associatedCase = associatedCaseObj?.toJSON();

    const defaultDic = {
        id: randomUUID(),
        name: 'Exámenes',
        administrativeStatus: associatedCase?.administrativeStatus,
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}


