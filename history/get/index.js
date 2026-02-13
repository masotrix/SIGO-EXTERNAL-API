export default async ({ MODELS }) => {

    const historyObjs = await MODELS.historys.findAll();

    const historys = historyObjs.map(historyObj => historyObj.toJSON());

    return { body: historys };
}
