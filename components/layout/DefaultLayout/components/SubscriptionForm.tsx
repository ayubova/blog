import {FC, useState} from "react";

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

const SubscriptionForm: FC = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [form, setForm] = useState<FormState>({
    state: Form.Initial,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setForm({state: Form.Loading});

    const form = e.target;

    const formData = new FormData(form);

    const res = await fetch("/api/subscribe", {
      method: "POST",

      headers: {"Content-Type": "application/x-www-form-urlencoded"},

      body: new URLSearchParams(formData as any).toString(),
    });

    const {error} = await res.json();

    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    setEmail("");

    setForm({
      state: Form.Success,
      message: "Success! You've been added to the list!",
    });
  };

  return (
    <div className="px-4 m-auto md:flex max-w-7xl  md:min-w-7xl w-full justify-between items-center">
      <div className="text-highlight-dark text-xl  md:text-2xl  md:max-w-md font-heading md:w-1/2">
            Get news from my blog delivered to your inbox
      </div>
      <div className="w-full md:w-1/2 pt-8 md:pt-0">
        <form onSubmit={handleSubmit}>
          <div className="my-2 py-2 w-full bg-transparent border-b-2 border-action mb-4 focus:outline-none flex justify-between">
            <div className="w-full">
              <label htmlFor="email"></label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <button>
              <p className="hover:text-action text-highlight-dark">{form.state === Form.Loading ? "loading..." : "Subscribe"}</p></button>
          </div>
        </form>
        {form.message && !email && (
          <div className="my-2 text-highlight-dark">
            {form.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm;
