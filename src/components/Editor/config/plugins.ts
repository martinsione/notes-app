import {
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createIndentPlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNormalizeTypesPlugin,
  createParagraphPlugin,
  createPlateUI,
  createPlugins,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
} from "@udecode/plate";
import { withStyledPlaceHolders } from "./components/withStyledPlaceHolders";
import { CONFIG } from "./config";

let components = createPlateUI();
components = withStyledPlaceHolders(components);

export const plugins = createPlugins(
  [
    // elements
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHeadingPlugin(),
    createParagraphPlugin(),

    // marks
    createBoldPlugin(),
    createCodePlugin(),
    createHighlightPlugin(),
    createHorizontalRulePlugin(),
    createImagePlugin(),
    createItalicPlugin(),
    createLinkPlugin(),
    createListPlugin(),
    createMediaEmbedPlugin(),
    createStrikethroughPlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createTablePlugin(),
    createTodoListPlugin(),
    createUnderlinePlugin(),

    // autoformat
    createAlignPlugin(CONFIG.align),
    createAutoformatPlugin(CONFIG.autoformat),
    createExitBreakPlugin(CONFIG.exitBreak),
    createIndentPlugin(CONFIG.indent),
    createNormalizeTypesPlugin(CONFIG.forceLayout),
    createResetNodePlugin(CONFIG.resetBlockType),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
    createSoftBreakPlugin(CONFIG.softBreak),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
  ],
  {
    components,
  }
);
