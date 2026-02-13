import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'history' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newHistory = await MODELS.history.create(body);

    return { body: newHistory.toJSON() };
}
