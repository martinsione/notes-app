import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { toUSVString } from "util";

export type EditableVoid = { type: "editable-void"; children: EmptyText[] };

export type BlockQuote = { type: "block-quote"; children: Descendant[] };

// Text
export type Title = { type: "title"; children: Descendant[] };
export type HeadingOne = { type: "heading-one"; children: Descendant[] };
export type HeadingTwo = { type: "heading-two"; children: Descendant[] };
export type HeadingThree = { type: "heading-three"; children: Descendant[] };
export type Paragraph = { type: "paragraph"; children: Descendant[] };

// Lists
export type OrderedList = {
  type: "ordered-list";
  children: Descendant[];
};

export type UnorderedList = {
  type: "unordered-list";
  children: Descendant[];
};

export type OrderedListItem = {
  type: "ordered-list-item";
  children: Descendant[];
};

export type UnorderedListItem = {
  type: "unordered-list-item";
  children: Descendant[];
};

export type CheckListItem = {
  type: "check-list-item";
  checked: boolean;
  children: Descendant[];
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

type CustomElement =
  | BlockQuote
  | EditableVoid
  | Title
  | HeadingOne
  | HeadingTwo
  | HeadingThree
  | Paragraph
  | OrderedList
  | UnorderedList
  | OrderedListItem
  | UnorderedListItem
  | CheckListItem;

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  text: string;
};

export type EmptyText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}
