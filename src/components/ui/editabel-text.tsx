import { useEffect, useRef, useState } from "react";

export type EditableTextProps = {
  onChange?: (text: string) => void;
  text?: string;
};
export default function EditableText({ text, onChange }: EditableTextProps) {
  const [editing, setEditing] = useState(false);

  const onSubmit = async (e: string) => {
    await onChange?.(e);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <EditForm value={text} onSubmit={onSubmit} />
      ) : (
        <p
          className="rounded border border-transparent hover:border-gray-300"
          onMouseUp={() => setEditing(true)}
        >
          {text}
        </p>
      )}
    </>
  );
}

function EditForm({
  onSubmit,
  value,
}: {
  onSubmit: (text: string) => void;
  value?: string;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [content, setContent] = useState(value);

  const clickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as HTMLElement)) {
      onSubmit(content!);
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  });

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(content!);
  };

  return (
    <form onSubmit={onFormSubmit} ref={formRef}>
      <input
        className="block w-full rounded border"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
}
