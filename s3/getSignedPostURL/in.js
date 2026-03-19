import { z } from 'minimonolith';

export default ({ MODELS, SERVICES }) => ({
  fileName: z.string().superRefine(async (fileName, ctx) => {
    const todaysDate = await SERVICES.dayjs.getTimezonedTimestamp({ dateOnly: 'true' });
    if (!fileName.startsWith(todaysDate+'_')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: { FILENAME_DOES_NOT_START_WITH: `${todaysDate}_`, GIVEN_FILENAME: `${fileName}` }
      });
    }
  }),
});
