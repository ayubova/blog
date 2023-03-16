import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "next-share";
import { AiFillGithub } from "react-icons/ai";

import DefaultLayout from "components/layout/DefaultLayout";

type Props = {};

const src =
  "https://res.cloudinary.com/dynf9cvqt/image/upload/v1678440784/blog/ffsggtpsxgtomq31o5ya.jpg";

const About: NextPage<Props> = () => {
  return (
    <DefaultLayout>
      <div className="py-10 px-10 md:space-x-10 flex md:flex-row flex-col">
        <Image src={src} width={400} height={500} alt="Julia Ayubova" />
        <div className="p-4 text-justify space-y-2">
          <p>Hello, I am Julia Ayubova!</p>
          <p>I am a frontend developer with 6 year of experience.</p>
          <p>
            I created this blog as my pet project learning Next.js and here I am
            going to write about what I like because I quit social medias and
            sometimes I want to share my thoughts.
          </p>
          <div className="flex items-center space-x-3 pt-4">
            <Link href="https://www.linkedin.com/in/julia-ayubova-a46790120/">
              <a target={"_blank"}>
                <LinkedinIcon round size={32} />
              </a>
            </Link>
            <Link href="https://wa.me/+905431673724">
              <a target={"_blank"}>
                <WhatsappIcon round size={32} />
              </a>
            </Link>
            <Link href="https://t.me/julia_ayubova">
              <a target={"_blank"}>
                <TelegramIcon round size={32} />
              </a>
            </Link>
            <Link href="mailto:ayubova.yuliya@gmail.com">
              <a target={"_blank"}>
                <EmailIcon round size={32} />
              </a>
            </Link>
            <Link href="https://github.com/ayubova">
              <a target={"_blank"}>
                <AiFillGithub size={32} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
