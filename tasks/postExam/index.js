import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'tasks' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newTask = await MODELS.tasks.create(body);

    return { body: newTask.toJSON() };
}
