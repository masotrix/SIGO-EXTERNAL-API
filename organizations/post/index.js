import { randomUUID } from 'crypto';

import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'organizations' });

    if (validation) {
        return {
            status: 400,
            body: validation,
        };
    }

    const newOrganization =
        await MODELS.organizations.create({
            id: randomUUID(), ...body });

    return {
        body: newOrganization.toJSON()
    };
}
