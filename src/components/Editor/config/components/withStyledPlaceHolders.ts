import {
  ELEMENT_H1,
  ELEMENT_PARAGRAPH,
  PlatePluginComponent,
  withPlaceholders,
} from "@udecode/plate";

export const withStyledPlaceHolders = (
  components: Record<string, PlatePluginComponent<any>>
) =>
  withPlaceholders(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: "Type a paragraph",
      hideOnBlur: true,
    },
    {
      key: ELEMENT_H1,
      placeholder: "Untitled",
      hideOnBlur: false,
    },
  ]);
