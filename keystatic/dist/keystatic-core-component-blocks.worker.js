import { c as component } from './api-89838f33.worker.js';
import { c as cloudImageSchema, b as CloudImagePreview, a as cloudImageToolbarIcon } from './cloud-image-schema-754255ab.worker.js';
import 'react/jsx-runtime';
import './index-80178edb.worker.js';
import '@markdoc/markdoc/dist/index.mjs';
import 'emery/assertions';
import 'emery';
import './index-421e54e0.worker.js';
import '@braintree/sanitize-url';
import './index-d430f702.worker.js';

/** @deprecated Experimental */
function cloudImage(args) {
  return component({
    label: args.label,
    schema: cloudImageSchema,
    preview: CloudImagePreview,
    chromeless: true,
    toolbar: null,
    toolbarIcon: cloudImageToolbarIcon
  });
}

export { cloudImage };
