export { DropZone, dropZoneClassList } from './DropZone-1b6599d8.js';
import { filterDOMProps } from 'react-aria/filterDOMProps';
import { useObjectRef } from 'react-aria/useObjectRef';
import { PressResponder } from 'react-aria/private/interactions/PressResponder';
import { forwardRef, useMemo } from 'react';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { tokenSchema, classNames, css } from '@keystar/ui/style';
import { DragPreview } from 'react-aria/useDrag';
export { DIRECTORY_DRAG_TYPE } from 'react-aria/useDrag';
import { useDroppableItem, useDroppableCollection, useDropIndicator } from 'react-aria/useDroppableCollection';
import { isVirtualDragging } from 'react-aria/private/dnd/DragManager';
import { useDraggableCollection, useDraggableItem } from 'react-aria/useDraggableCollection';
import { useDraggableCollectionState } from 'react-stately/useDraggableCollectionState';
import { useDroppableCollectionState } from 'react-stately/useDroppableCollectionState';
export { isDirectoryDropItem, isFileDropItem, isTextDropItem } from 'react-aria/useDrop';

function FileTrigger(props, ref) {
  let {
    acceptedFileTypes,
    allowsMultiple,
    children,
    defaultCamera,
    onSelect,
    ...rest
  } = props;
  let inputRef = useObjectRef(ref);
  let domProps = filterDOMProps(rest);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(PressResponder, {
      onPress: () => {
        var _inputRef$current, _inputRef$current2;
        if ((_inputRef$current = inputRef.current) !== null && _inputRef$current !== void 0 && _inputRef$current.value) {
          // eslint-disable-next-line react-compiler/react-compiler
          inputRef.current.value = '';
        }
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.click();
      },
      children: children
    }), /*#__PURE__*/jsx("input", {
      ...domProps,
      accept: acceptedFileTypes === null || acceptedFileTypes === void 0 ? void 0 : acceptedFileTypes.toString(),
      capture: defaultCamera,
      multiple: allowsMultiple,
      onChange: e => onSelect === null || onSelect === void 0 ? void 0 : onSelect(e.target.files),
      ref: inputRef,
      style: {
        display: 'none'
      },
      type: "file"
    })]
  });
}

/**
 * A FileTrigger allows a user to access the file system with any pressable
 * component, or custom components built with usePress.
 */
const _FileTrigger = /*#__PURE__*/forwardRef(FileTrigger);

function InsertionIndicatorPrimitive(props) {
  let {
    children,
    isDropTarget,
    ...otherProps
  } = props;
  let maskColor = tokenSchema.color.background.canvas;
  let borderColor = tokenSchema.color.background.accentEmphasis;
  let borderSize = tokenSchema.size.border.medium;
  let circleSize = tokenSchema.size.space.regular;
  return /*#__PURE__*/jsx("div", {
    "data-drop-target": isDropTarget,
    ...otherProps,
    className: classNames(css({
      insetInlineStart: circleSize,
      outline: 'none',
      position: 'absolute',
      width: `calc(100% - (2 * ${circleSize}))`,
      '&[data-drop-target=true]': {
        borderBottom: `${borderSize} solid ${borderColor}`,
        '&::before': {
          left: `calc(${circleSize} * -1)`
        },
        '&::after': {
          right: `calc(${circleSize} * -1)`
        },
        '&::before, &::after': {
          backgroundColor: maskColor,
          border: `${borderSize} solid ${borderColor}`,
          borderRadius: '50%',
          content: '" "',
          height: circleSize,
          position: 'absolute',
          top: `calc(${circleSize} / -2 - ${borderSize} / 2)`,
          width: circleSize,
          zIndex: 5
        }
      }
    }), otherProps.className),
    children: children
  });
}

/* eslint-disable react-compiler/react-compiler */
/**
 * Provides the hooks required to enable drag and drop behavior for a drag and drop compatible React Spectrum component.
 */
function useDragAndDrop(options) {
  let dragAndDropHooks = useMemo(() => {
    let {
      onDrop,
      onInsert,
      onItemDrop,
      onReorder,
      onRootDrop,
      getItems,
      renderPreview
    } = options;
    let isDraggable = !!getItems;
    let isDroppable = !!(onDrop || onInsert || onItemDrop || onReorder || onRootDrop);
    let hooks = {};
    if (isDraggable) {
      // @ts-expect-error
      hooks.useDraggableCollectionState = function useDraggableCollectionStateOverride(props) {
        return useDraggableCollectionState({
          ...props,
          ...options
        });
      };
      hooks.useDraggableCollection = useDraggableCollection;
      hooks.useDraggableItem = useDraggableItem;
      hooks.DragPreview = DragPreview;
      hooks.renderPreview = renderPreview;
    }
    if (isDroppable) {
      hooks.useDroppableCollectionState = function useDroppableCollectionStateOverride(props) {
        return useDroppableCollectionState({
          ...props,
          ...options
        });
      };
      hooks.useDroppableItem = useDroppableItem;
      hooks.useDroppableCollection = function useDroppableCollectionOverride(props, state, ref) {
        return useDroppableCollection({
          ...props,
          ...options
        }, state, ref);
      };
      hooks.useDropIndicator = useDropIndicator;
    }
    if (isDraggable || isDroppable) {
      hooks.isVirtualDragging = isVirtualDragging;
    }
    return hooks;
  }, [options]);
  return {
    dragAndDropHooks
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

// https://github.com/adobe/react-spectrum/blob/759ac41ae9683d053044c508d9ec0dccebd3b8dd/packages/%40react-stately/data/src/useListData.ts#L335
function move(items, indices, toIndex) {
  // Shift the target down by the number of items being moved from before the target
  toIndex -= indices.filter(index => index < toIndex).length;
  let moves = indices.map(from => ({
    from,
    to: toIndex++
  }));

  // Shift later from indices down if they have a larger index
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i].from;
    for (let j = i; j < moves.length; j++) {
      let b = moves[j].from;
      if (b > a) {
        moves[j].from--;
      }
    }
  }

  // Interleave the moves so they can be applied one by one rather than all at once
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i];
    for (let j = moves.length - 1; j > i; j--) {
      let b = moves[j];
      if (b.from < a.to) {
        a.to++;
      } else {
        b.from++;
      }
    }
  }
  let copy = items.slice();
  for (let move of moves) {
    let [item] = copy.splice(move.from, 1);
    copy.splice(move.to, 0, item);
  }
  return copy;
}

export { _FileTrigger as FileTrigger, InsertionIndicatorPrimitive, move, useDragAndDrop };
