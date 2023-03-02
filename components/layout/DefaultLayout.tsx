import { FC, ReactNode } from "react";
import AppHead from "components/common/AppHead";
import UserNav from "components/common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary-light dark:bg-primary-dark transition font-mono">
        <UserNav />
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
