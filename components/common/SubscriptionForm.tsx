import { FC, useState } from "react";
import ActionButton from "./ActionButton";

interface Props {}

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

const SubscriptionForm: FC<Props> = (): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState<FormState>({
    state: Form.Initial,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    const form = e.target;

    const formData = new FormData(form);

    const res = await fetch("/api/subscribe", {
      method: "POST",

      headers: { "Content-Type": "application/x-www-form-urlencoded" },

      body: new URLSearchParams(formData as any).toString(),
    });

    const { error } = await res.json();

    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    setName("");
    setEmail("");

    setForm({
      state: Form.Success,
      message: `Success! You've been added to the list!`,
    });
  };

  return (
    <div className="p-4 w-96 m-auto pt-20">
      <form onSubmit={handleSubmit}>
        <div className="text-primary-main text-lg font-semibold">
          Sign up for my newsletter
        </div>
        <label htmlFor="name"></label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          required
          placeholder="What is your name?"
          className="my-2 w-full bg-transparent border-b-2 border-primary-main focus:outline-none"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          placeholder="On what email can I reach you?"
          className="my-2 w-full bg-transparent border-b-2 border-primary-main mb-4 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="my-2 text-highlight-dark">
          {form.message
            ? form.message
            : `I'll send emails only when new content is posted.`}
        </div>
        <ActionButton
          title={form.state === Form.Loading ? "loading..." : "Subscribe 💌"}
        />
      </form>
    </div>
  );
};

export default SubscriptionForm;
