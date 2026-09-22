import { i as integer } from './index-f88d9c47.js';
import { aN as text } from './index-68d71016.js';

const cloudImageSchema = {
  src: text({
    label: 'URL',
    validation: {
      length: {
        min: 1
      }
    }
  }),
  alt: text({
    label: 'Alt text'
  }),
  height: integer({
    label: 'Height'
  }),
  width: integer({
    label: 'Width'
  })
};

export { cloudImageSchema as c };
