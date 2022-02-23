import {
  Editor,
  Element as SlateElement,
  Point,
  Range,
  Transforms,
} from "slate";
import { CustomEditor, OrderedList, UnorderedList } from "../types";
import { shortcuts } from "./shortcuts";

export const withShortcuts = (editor: CustomEditor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = shortcuts[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        const newProperties: Partial<SlateElement> = { type };
        Transforms.setNodes<SlateElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n),
        });

        if (type === "unordered-list-item") {
          const list: UnorderedList = { type: "unordered-list", children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "unordered-list-item",
          });
        } else if (type === "ordered-list-item") {
          const list: OrderedList = { type: "ordered-list", children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "ordered-list-item",
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          SlateElement.isElement(block) &&
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<SlateElement> = {
            type: "paragraph",
          };
          Transforms.setNodes(editor, newProperties);

          if (block.type === "unordered-list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "unordered-list",
              split: true,
            });
          }

          if (block.type === "ordered-list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n.type === "ordered-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};
