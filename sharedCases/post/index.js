import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'sharedCases' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newSharedCase = await MODELS.sharedCases.create(body);

    return { body: newSharedCase.toJSON() };
}
