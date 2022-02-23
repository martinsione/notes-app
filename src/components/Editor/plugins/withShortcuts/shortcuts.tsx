import { CustomElement } from "../types";

export const shortcuts = {
  "*": "unordered-list-item",
  "-": "unordered-list-item",
  "+": "unordered-list-item",
  "1.": "ordered-list-item",
  "1)": "ordered-list-item",
  ">": "block-quote",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
};

export const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: any;
  children: React.ReactNode;
  element: CustomElement;
}) => {
  const Elements = {
    "block-quote": <blockquote {...attributes}>{children}</blockquote>,
    "unordered-list": <ul {...attributes}>{children}</ul>,
    "ordered-list": <ol {...attributes}>{children}</ol>,
    "ordered-list-item": <li {...attributes}>{children}</li>,
    "unordered-list-item": <li {...attributes}>{children}</li>,
    "heading-one": <h1 {...attributes}>{children}</h1>,
    "heading-two": <h2 {...attributes}>{children}</h2>,
    "heading-three": <h3 {...attributes}>{children}</h3>,
  };
  const DefaultElement = <p {...attributes}>{children}</p>;
  return Elements[element.type] || DefaultElement;
};
