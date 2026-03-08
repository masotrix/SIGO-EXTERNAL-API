import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const statusV1 = [
    'PENDING',
];
const statusV2 = [
    'CONFIRMED',
    'REJECTED',
];

const sharedCaseValidation = async ({ field, body, MODELS }) => {

    const notExistsSharedCase = await validations.exists({
        field, body, MODELS, model: 'sharedCases' });

    if (notExistsSharedCase) {
        return { [field]: `SharedCase con id='${body[field]}' `+
            `no existe en base de datos` }
    };

    const sharedCaseObj = await MODELS.sharedCases.findOne({
        where: { [field]: body[field] } });

    const sharedCase = sharedCaseObj.toJSON();

    if (!statusV1.includes(sharedCase.status)) {
        return { [field]: `SharedCase con id='${body[field]}' `+
            `tiene status='{sharedCase.status}'. Opciones permitidas `+
            `son: [${statusV1.map(cat => "'"+cat+"'")}]` }
    }

    const notExistsOrganization = await validations.exists({
        field: 'organizationId', body, MODELS,
        model: 'organizations' });
    if (notExistsOrganization) return notExistsOrganization;

    const organizationObj = await MODELS.organizations.findOne({
        where: { id: body.organizationId } });

    const organization = organizationObj.toJSON();

    if (sharedCase.organizationId !== body.organizationId) {
        return { id: `SharedCase con id='${body.id}' no tiene como ` +
            `destino a organización con id='${organization.id}' `+
            `(name='${organization.name}')` };
    }

    return false;
}

export default async ({ body, MODELS, model }) => {

    const validationDic = {

        id: async (field, body) => await sharedCaseValidation({
                field, body, MODELS }),

        organizationId: (field, body) => { return false },
            /*
            async (field, body) =>
            await validations.exists({
                    field: 'organizationId', body, MODELS,
                    model: 'organizations' }) */
        status:
            (field, body) => validations.categorical({
                field, body, categories: statusV2 }),
    };

    const defaultDic = {
        // id: randomUUID(),
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
