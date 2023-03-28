import type { NextPage } from "next";
import Image from "next/image";
import ContactButtons from "components/common/ContactButtons";

import DefaultLayout from "components/layout/DefaultLayout";

type Props = {};

const src =
  "https://res.cloudinary.com/dynf9cvqt/image/upload/v1678440784/blog/ffsggtpsxgtomq31o5ya.jpg";

const About: NextPage<Props> = () => {
  return (
    <DefaultLayout>
      <div className="py-10 px-10 md:space-x-10 flex md:flex-row flex-col max-w-6xl">
        <div className="w-1/2 min-w-fit overflow-clip">
          <Image
            src={src}
            width={400}
            height={500}
            alt="Julia Ayubova"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="p-4 text-justify space-y-4 text-secondary-dark">
          <p>Hello, I am Julia Ayubova!</p>
          <p>I am a frontend developer with 6 year of experience.</p>
          <p>
            I created this blog as my pet project learning Next.js and here I am
            going to write about what I like because I quit social medias and
            sometimes I want to share my thoughts.
          </p>
          <p>You can find me here:</p>
          <ContactButtons />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;
