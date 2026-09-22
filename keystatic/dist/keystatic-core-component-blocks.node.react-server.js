import { c as component } from './api-33013d44.node.react-server.js';
import { c as cloudImageSchema, b as CloudImagePreview, a as cloudImageToolbarIcon } from './cloud-image-schema-dd4865e3.node.react-server.js';
import 'react/jsx-runtime';
import './index-4f9b6f6e.node.react-server.js';
import '@markdoc/markdoc/dist/index.mjs';
import 'emery/assertions';
import 'emery';
import './index-85c94b52.node.react-server.js';
import 'crypto';
import '@braintree/sanitize-url';
import './index-60dec210.node.react-server.js';

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
