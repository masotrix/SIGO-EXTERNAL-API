export default async ({ MODELS }) => {

    const mandatoryNotificationObjs =
        await MODELS.mandatoryNotifications.findAll();

    const mandatoryNotifications = mandatoryNotificationObjs.map(
        mandatoryNotificationObj => mandatoryNotificationObj.toJSON());

    return { body: mandatoryNotifications };
}
