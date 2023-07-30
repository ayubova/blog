import { EditorContent } from "@tiptap/react";
import { FC, useEffect } from "react";
import ActionButton from "./ActionButton";
import useEditorConfig from "hooks/useEditorConfig";

interface Props {
  title?: string;
  onSubmit(content: string): void;
  busy?: boolean;
  onClose?(): void;
  initialState?: string;
  visible?: boolean;
}

const CommentForm: FC<Props> = ({
  title,
  busy = false,
  initialState,
  onSubmit,
  onClose,
  visible = true,
}): JSX.Element | null => {
  const { editor } = useEditorConfig({ placeholder: "Add your comment..." });

  const handleSubmit = async () => {
    if (editor && !busy) {
      const value = editor?.getHTML();
      if (value === "<p></p>") return;

      await onSubmit(value);
      !onClose && editor?.chain()?.setContent("")?.run();
    }
  };

  useEffect(() => {
    if (typeof initialState === "string")
      editor?.chain().focus().setContent(initialState).run();
  }, [editor, initialState]);

  if (!visible) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-lg text-primary-dark dark:text-primary-light font-semibold py-3">
          {title}
        </h1>
      ) : null}
      <EditorContent
        className="min-h-[100px] border-2 border-secondary-dark rounded p-2"
        editor={editor}
      />

      <div className="md:flex justify-end py-3">
        <div className="flex space-x-4">
          <ActionButton busy={busy} title="Submit" onClick={handleSubmit} />

          {onClose ? (
            <button
              onClick={onClose}
              className="text-primary-dark dark:text-primary-light"
            >
              Сlose
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
