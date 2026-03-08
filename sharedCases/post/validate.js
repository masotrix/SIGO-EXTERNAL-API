import { randomUUID } from 'crypto';

import * as validations from '../../validations.js';

const statusV = [
    'PENDING',
    'CONFIRMED',
    'REJECTED',
];

const organizationValidation = async ({ field, body, MODELS }) => {

    const existsTargetOrganization = await validations.exists({
        field, body, MODELS, model: 'organizations' });
    if (existsTargetOrganization) return existsTargetOrganization;

    const existsOriginOrganization = await validations.exists({
        field: 'originOrganizationId', body,
        MODELS, model: 'organizations' });
    if (existsOriginOrganization) return existsOriginOrganization;

    const originOrganizationObj = await MODELS.organizations.findOne({
        where: { id: body.originOrganizationId } });
    const originOrganization = originOrganizationObj.toJSON();

    const organizationObj = await MODELS.organizations.findOne({
        where: { id: body.organizationId } });
    const organization = organizationObj.toJSON();

    if (body.originOrganizationId === body.organizationId) {
        return { [field]: `No es posible compartir caso de `+
            `organización con id='${body.organizationId}' `+
            `(name='${originOrganization.name}') consigo misma.` };
    }

    const existsCase = await validations.exists({
        field: 'caseId', body, MODELS, model: 'cases' });
    if (existsCase) return existsCase;

    const theCaseObj = await MODELS.cases.findOne({
        where: { id: body.caseId } });

    const theCase = theCaseObj.toJSON();

    if (theCase.organizationId !== body.originOrganizationId) {
        return { caseId: `Caso con id='${theCase.id}' no `+
            `pertenece a organización con `+
            `id='${body.originOrganizationId}' `+
            `(name=${originOrganization.name})` };
    }

    return false;
}

export default async ({ body, MODELS, model }) => {

    const validationDic = {

        organizationId: async (field, body) =>
            await organizationValidation({ field, body, MODELS }),

        caseId: (field, body) => { return false },

        originOrganizationId: (field, body) => { return false },
        /*
        status:
            (field, body) => validations.optional({ field, body },
                validations.categorical({
                    field, body, categories: statusV })),
        */
    };

    const defaultDic = {
        id: randomUUID(),
        status: 'PENDING',
    }

    return await validations.validate({
        body, validationDic, MODELS, model, defaultDic });
}
