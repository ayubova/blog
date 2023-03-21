import { FC } from "react";
import { MdRssFeed } from "react-icons/md";
import Link from "next/link";

const Footer: FC = (): JSX.Element => {
  return (
    <div className="bg-secondary-dark flex space-x-4 p-4 justify-between items-center">
      <p className="text-primary-light">
        &copy; {new Date().getFullYear().toString()} by Julia Ayubova
      </p>
      <Link href="/rss.xml">
        <a rel="noreferrer" target="_blank">
          <div className="flex justify-center items-center space-x-2">
            <div className="text-secondary-main">RSS</div>
            <MdRssFeed color="#fad0c3" size="30px" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Footer;
