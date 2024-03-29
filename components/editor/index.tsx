import {ChangeEventHandler, FC, useEffect, useState} from "react";
import {EditorContent, Range} from "@tiptap/react";

import Toolbar from "./Toolbar";
import EditLink from "./Link/EditLink";
import GalleryModal, {ImageSelectionResult} from "./GalleryModal";
import SEOForm, {SeoResult} from "./SeoForm";
import ThumbnailSelector from "./ThumbnailSelector";
import ActionButton from "components/ui/ActionButton";
import useEditorConfig from "hooks/useEditorConfig";
import {getImages, uploadImage} from "api"

// TODO: Вынести Post и другие глобальные типы в blog/types
export interface Post extends SeoResult {
  id?: string;
  title: string;
  content: string;
  thumbnail?: File | string;
}

interface Props {
  initialValue?: Post;
  btnTitle?: string;
  busy?: boolean;
  onSubmit(post: Post): void;
}

const Editor: FC<Props> = ({
  initialValue,
  btnTitle = "Submit",
  busy = false,
  onSubmit,
}): JSX.Element => {
  const [selectionRange] = useState<Range>();
  const [showGallery, setShowGallery] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
  const [post, setPost] = useState<Post>({
    title: "",
    content: "",
    meta: "",
    tags: "",
    slug: "",
    draft: false,
  });

  const fetchImages = async () => {
    const {data} = await getImages();
    setImages(data.images);
  };

  const handleImageUpload = async (image: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const {data} = await uploadImage(formData);
    setUploading(false);

    setImages([data, ...images]);
  };

  const {editor} = useEditorConfig();

  const handleImageSelection = (result: ImageSelectionResult) => {
    editor
      ?.chain()
      .focus()
      .setImage({src: result.src, alt: result.altText})
      .run();
  };

  const handleSubmit = () => {
    if (!editor) return;
    onSubmit({...post, content: editor.getHTML()});
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({target}) =>
    setPost({...post, title: target.value});

  const updateSeoValue = (result: SeoResult) => setPost({...post, ...result});

  const updateThumbnail = (file: File) => setPost({...post, thumbnail: file});

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (initialValue) {
      setPost({...initialValue});
      editor?.commands.setContent(initialValue.content);

      const {meta, slug, tags, draft} = initialValue;
      setSeoInitialValue({meta, slug, tags, draft});
    }
  }, [initialValue, editor]);

  return (
    <>
      <div className="p-3 dark:bg-primary-dark bg-primary transition">
        <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
          {/* Thumbnail Selector and Submit Button */}
          <div className="flex items-center justify-between mb-3">
            <ThumbnailSelector
              initialValue={post.thumbnail as string}
              onChange={updateThumbnail}
            />
            <div className="inline-block">
              <ActionButton
                busy={busy}
                title={btnTitle}
                onClick={handleSubmit}
              />
            </div>
          </div>

          {/* Title Input */}
          <input
            type="text"
            className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
            placeholder="Title"
            onChange={updateTitle}
            value={post.title}
          />
          <Toolbar editor={editor} onOpenImage={() => setShowGallery(true)} />
          <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        </div>

        {editor ? <EditLink editor={editor} /> : null}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
        <SEOForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitialValue}
        />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onSelect={handleImageSelection}
        images={images}
        onFileSelect={handleImageUpload}
        uploading={uploading}
      />
    </>
  );
};

export default Editor;
