import { FC } from "react";
import { EditorContent, getMarkRange, Range } from "@tiptap/react";
import useEditorConfig from "hooks/useEditorConfig";
import ActionButton from "./ActionButton";

interface Props {
  title?: string;
}

const CommentForm: FC<Props> = ({ title }): JSX.Element => {
  const { editor } = useEditorConfig();
  return (
    <div>
      {title ? (
        <h1 className="text-xl text-primary-dark dark:text-primary font-semibold py-3">
          {title}
        </h1>
      ) : null}
      <EditorContent
        editor={editor}
        className="min-h-[300px] border-2 border-x-secondary-dark rounded p-2"
      />
      <div className="flex justify-end py-3">
        <div className=" inline-block">
          <ActionButton title="Submit" />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
