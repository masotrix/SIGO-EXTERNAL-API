import { z } from 'minimonolith';

export default ({ MODELS }) => ({
  fileName: z.string(),
  fileB64: z.string(),
});
