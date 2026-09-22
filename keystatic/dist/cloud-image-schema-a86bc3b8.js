import { i as integer } from './index-5a044ed3.js';
import { aN as text } from './index-30819e12.js';

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
