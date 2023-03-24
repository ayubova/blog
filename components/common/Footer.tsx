import { FC } from "react";
import { MdRssFeed } from "react-icons/md";
import Link from "next/link";
import SubscriptionForm from "./SubscriptionForm";
import ContactButtons from "./ContactButtons";

const Footer: FC = (): JSX.Element => {
  return (
    <div className="bg-secondary-mediumDark flex flex-col items-center pt-6">
      <SubscriptionForm />
      <div className="pb-6">
        <ContactButtons />
      </div>

      <div className=" flex bg-secondary-dark space-x-4 p-4 justify-between items-center w-full">
        <p className="text-primary-light">
          &copy; {new Date().getFullYear().toString()} by Julia Ayubova
        </p>
        <Link href="/rss.xml">
          <a rel="noreferrer" target="_blank">
            <div className="flex justify-center items-center space-x-2">
              <div className="text-secondary-main font-semibold text-lg">
                RSS
              </div>
              <div className="text-secondary-main">
                <MdRssFeed size="24px" />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
