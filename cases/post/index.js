import { randomUUID } from 'crypto';

import validate from './validate.js';

export default async ({ body }) => {

    const validation = await validate({ body, MODELS, model: 'cases' });
    if (validation) {
        return { status: 400, body: validation };
    }

    const newCase = await MODELS.cases.create({
        id: randomUUID(), ...body });

    return {
        body: newCase.toJSON()
    };
}
