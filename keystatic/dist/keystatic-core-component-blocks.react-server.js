import { c as component } from './api-0dafbb3a.react-server.js';
import { c as cloudImageSchema, b as CloudImagePreview, a as cloudImageToolbarIcon } from './cloud-image-schema-594ba400.react-server.js';
import 'react/jsx-runtime';
import './index-1f28fdb7.react-server.js';
import '@markdoc/markdoc/dist/index.mjs';
import 'emery/assertions';
import 'emery';
import './index-d6ed5d11.react-server.js';
import '@braintree/sanitize-url';
import './index-d3215e10.react-server.js';

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
