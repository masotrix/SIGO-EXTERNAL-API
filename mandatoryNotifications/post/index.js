import validate from './validate.js';

export default async ({ body, MODELS }) => {

    const validation = await validate({
        body, MODELS, model: 'mandatoryNotifications' });

    if (validation) {
        return { status: 400, body: validation };
    }

    const newmandatoryNotification =
        await MODELS.mandatoryNotifications.create(body);

    return { body: newmandatoryNotification.toJSON() };
}
