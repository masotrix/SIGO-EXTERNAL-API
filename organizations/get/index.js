export default async ({ MODELS }) => {

    const organizationObjs = await MODELS.organizations.findAll();

    const organizations = organizationObjs.map(
        organizationObj => organizationObj.toJSON());

    return { body: organizations };
}
