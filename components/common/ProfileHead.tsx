import Image from "next/image";
import {FC} from "react";

interface Props {
  avatar?: string;
  nameInitial?: string;
}

const ProfileHead: FC<Props> = ({
  avatar,
  nameInitial,
}): JSX.Element => {
  // fix for crushing image in production (https://github.com/vercel/next.js/discussions/19089)
  const contentfulLoader = ({src, quality, width}: any) => {
    const params = [`w=${width}`];

    if (quality) {
      params.push(`q=${quality}`);
    }

    return `${src}?${params.join("&")}`;
  };

  return (
    <div className="flex items-center">
      <div className={"relative flex items-center justify-center rounded-full overflow-hidden w-7 h-7 md:w-9 md:h-9 select-none text-primary-dark"}>
        {avatar ? (
          <Image
            src={avatar}
            fill
            alt="profile"
            loader={contentfulLoader}
          />
        ) : (
          nameInitial
        )}
      </div>
    </div>
  );
};

export default ProfileHead;
