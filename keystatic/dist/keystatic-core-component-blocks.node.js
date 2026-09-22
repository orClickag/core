import { c as component } from './api-ad0d5063.node.js';
import { c as cloudImageSchema, b as CloudImagePreview, a as cloudImageToolbarIcon } from './cloud-image-schema-c52e3899.node.js';
import 'react/jsx-runtime';
import './index-d63f1aca.node.js';
import '@markdoc/markdoc/dist/index.mjs';
import 'emery/assertions';
import 'emery';
import './index-3b41a08c.node.js';
import 'crypto';
import '@braintree/sanitize-url';
import './index-7de73381.node.js';

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
