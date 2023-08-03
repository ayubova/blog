import {FC} from "react";
import {MdRssFeed} from "react-icons/md";
import SubscriptionForm from "./SubscriptionForm";
import ContactButtons from "./ContactButtons";

const Footer: FC = (): JSX.Element => {
  return (
    <div className="bg-background-grey flex flex-col items-center py-16 space-y-10">
      <SubscriptionForm />
      <div className="w-full max-w-7xl">
        <ContactButtons />
      </div>

      <div className="flex space-x-4 justify-between items-center w-full max-w-7xl px-4 md:px-0">
        <p className="text-highlight-dark">
          &copy; {new Date().getFullYear().toString()} by Julia Ayubova
        </p>
        <a rel="noreferrer" href="/rss.xml" target="_blank">
          <div className="flex justify-center items-center space-x-2">
            <div className="text-highlight-dark font-semibold text-lg">
                RSS
            </div>
            <div className="text-highlight-dark">
              <MdRssFeed size="22px" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
