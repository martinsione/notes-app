import { FormatBold } from "@styled-icons/material/FormatBold";
import { FormatItalic } from "@styled-icons/material/FormatItalic";
import { FormatUnderlined } from "@styled-icons/material/FormatUnderlined";
import { TippyProps } from "@tippyjs/react";
import {
  BalloonToolbar,
  getPluginType,
  MarkToolbarButton,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  usePlateEditorRef,
} from "@udecode/plate";

export const MarkBallonToolbar = () => {
  const editor = usePlateEditorRef();

  const arrow = false;
  const theme = "dark";
  const tooltip: TippyProps = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: "top",
  };

  return (
    <BalloonToolbar
      popperOptions={{ placement: "top" }}
      theme={theme}
      arrow={arrow}
    >
      <MarkToolbarButton
        type={getPluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={{ content: "Bold (⌘B)", ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={{ content: "Italic (⌘I)", ...tooltip }}
      />
      <MarkToolbarButton
        type={getPluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={{ content: "Underline (⌘U)", ...tooltip }}
      />
    </BalloonToolbar>
  );
};
