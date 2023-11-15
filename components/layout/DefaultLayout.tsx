import {FC, ReactNode} from "react";
import {RiArrowUpDoubleLine} from "react-icons/ri"
import AppHead from "components/common/AppHead";
import UserNav from "components/common/nav/UserNav";
import Footer from "components/common/Footer";
interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
  tags: string[];
  metaSrc?: string;
  showTopButton?: boolean;
}

const DefaultLayout: FC<Props> = ({children, title, desc, tags, metaSrc, showTopButton = false}): JSX.Element => {
  const handleScroll = () => window.scrollTo({top: 0, behavior: "smooth"})
  return (
    <>
      <AppHead title={title} desc={desc} src={metaSrc} />
      <div className={`layout min-h-screen w-screen bg-primary-light dark:bg-background-dark transition font-sans dark:text-primary-light ${showTopButton ? "grid" : "flex flex-col"}`} style={{gridTemplateColumns: "auto 0px"}}>
        <UserNav tags={tags}/>
        <div className="flex flex-col items-center pt-40">
          {children}
        </div>
        {showTopButton && (
          <div className="sticky place-self-end mt-[300vh] mb-10 right-4 bottom-4 lg:bottom-10 lg:right-10 cursor-pointer bg-black p-2 rounded-full hover:-translate-y-1 transition-all" onClick={handleScroll}>
            <div className="flex justify-center items-center">
              <RiArrowUpDoubleLine size={20} color="white"/>
            </div>
          </div>
        )}
        <Footer />
      </div>

    </>
  );
};

export default DefaultLayout;
