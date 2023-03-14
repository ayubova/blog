import classNames from "classnames";
import Image from "next/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}
const commonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";
const ProfileHead: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);

  // fix for crushing image in production (https://github.com/vercel/next.js/discussions/19089)
  const contentfulLoader = ({ src, quality, width }: any) => {
    const params = [`w=${width}`];

    if (quality) {
      params.push(`q=${quality}`);
    }

    return `${src}?${params.join("&")}`;
  };

  return (
    <div className="flex items-center">
      <div className={classNames(commonClasses, getStyle())}>
        {avatar ? (
          <Image
            src={avatar}
            layout="fill"
            alt="profile"
            loader={contentfulLoader}
          />
        ) : (
          nameInitial
        )}
      </div>
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
