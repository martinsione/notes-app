import { useCallback, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { Element, withShortcuts } from "./plugins/withShortcuts";

export default function Editor({
  id,
  initialValue,
  onChange,
}: {
  id: string;
  initialValue: Descendant[];
  onChange: (value: Descendant[]) => void;
}) {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(() => {
    return withShortcuts(withReact(withHistory(createEditor())));
  }, []);
  return (
    <Slate key={id} editor={editor} value={initialValue} onChange={onChange}>
      {JSON.stringify(initialValue)}
      <Editable
        renderElement={renderElement}
        placeholder="Write some markdown..."
        spellCheck={false}
        autoFocus={false}
      />
    </Slate>
  );
}
