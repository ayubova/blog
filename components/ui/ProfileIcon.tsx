import classNames from "classnames";
import Image from "next/image";
import {FC, useCallback} from "react";

interface Props {
  avatar?: string;
  nameInitial?: string;
  lightOnly?: boolean;
}
const commonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileIcon: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary";
  }, [lightOnly]);

  return (
    <div className={classNames(commonClasses, getStyle())}>
      {avatar ? (
        <Image src={avatar} fill alt="profile" sizes="10vw"/>
      ) : (
        nameInitial
      )}
    </div>
  );
};

export default ProfileIcon;
