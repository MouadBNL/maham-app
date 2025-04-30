import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

export const MilkdownEditor = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (mkd: string) => void;
}) => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: value,
      features: {
        "block-edit": false,
      },
    });
    crepe.on((action) => {
      action.markdownUpdated((ctx, markdown, previousMarkdown) => {
        onChange?.(markdown);
      });
    });
    return crepe;
  }, []);

  return <Milkdown />;
};

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (mkd: string) => void;
}) {
  return (
    <MilkdownProvider>
      <div className="markdown-editor">
        <MilkdownEditor value={value} onChange={onChange} />
      </div>
    </MilkdownProvider>
  );
}
