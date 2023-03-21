import { FC, ReactNode } from "react";
import AppHead from "components/common/AppHead";
import UserNav from "components/common/nav/UserNav";
import Footer from "components/common/Footer";
interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition font-serif dark:text-primary-light flex flex-col justify-between">
        <UserNav />
        <div className="mx-auto">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
