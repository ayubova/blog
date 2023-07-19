import { FC, ReactNode } from "react";
import AppHead from "components/common/AppHead";
import UserNav from "components/common/nav/UserNav";
import Footer from "components/common/Footer";
interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
  tags: string[]
}

const DefaultLayout: FC<Props> = ({ children, title, desc, tags }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen w-screen bg-primary-light dark:bg-background-dark transition font-sans dark:text-primary-light flex flex-col justify-between">
        <UserNav tags={tags} />
        <div className="flex flex-col items-center">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
