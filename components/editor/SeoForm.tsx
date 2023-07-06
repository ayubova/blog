import { ChangeEventHandler, FC, useEffect, useState } from "react";
import classnames from "classnames";
import slugify from "slugify";

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
  draft: boolean | string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2";

const SeoForm: FC<Props> = ({ initialValue, title = "", onChange }) => {
  const [values, setValues] = useState({
    meta: "",
    slug: "",
    tags: "",
    draft: false,
  });

  const handleChange: ChangeEventHandler<any> = ({ target }) => {
    let { name, value } = target;
    if (name === "draft") value = target.checked;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      const draft = initialValue.draft === "true" ? true : false;
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug),
        draft,
      });
    }
  }, [initialValue]);

  const { meta, slug, tags, draft } = values;

  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>

      <Input
        value={draft}
        onChange={handleChange}
        name="draft"
        label="Draft"
        type="checkbox"
      />

      <Input
        value={slug}
        onChange={handleChange}
        name="slug"
        placeholder="slug-goes-here"
        label="Slug:"
      />
      <Input
        value={tags}
        onChange={handleChange}
        name="tags"
        placeholder="React, Next JS"
        label="Tags:"
      />

      <div className="relative">
        <textarea
          name="meta"
          value={meta}
          onChange={handleChange}
          className={classnames(commonInput, "text-lg h-20 resize-none")}
          placeholder="Meta description 300 characters will be fine"
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
          {meta.length}/300
        </p>
      </div>
    </div>
  );
};

const Input: FC<{
  name?: string;
  value?: string | boolean;
  placeholder?: string;
  label?: string;
  type?: "text" | "checkbox";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange, type = "text" }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-primary-dark dark:text-primary-light pl-2">
        {label}
      </span>

      {type === "text" && (
        <input
          type={type}
          name={name}
          value={value as string}
          placeholder={placeholder}
          className={classnames(commonInput, "italic pl-10")}
          onChange={onChange}
        />
      )}
      {type === "checkbox" && (
        <input
          type={type}
          name={name}
          checked={value as boolean}
          placeholder={placeholder}
          className={classnames(commonInput, "italic pl-10")}
          onChange={onChange}
        />
      )}
    </label>
  );
};

export default SeoForm;
