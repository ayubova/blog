/* eslint-disable react/no-unescaped-entities */
import type {NextPage, InferGetStaticPropsType, GetStaticProps} from "next";
  
import Image from "next/image";

import DefaultLayout from "components/layout/DefaultLayout";
import {getTagsCollection} from "lib/utils";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const src =
  "https://res.cloudinary.com/dynf9cvqt/image/upload/v1678440784/blog/ffsggtpsxgtomq31o5ya.jpg";

const About: NextPage<Props> = ({tags}: Props) => {
  return (
    <DefaultLayout tags={tags}>
      <div className="py-10 md:px-10 px-4 md:space-x-10 flex md:flex-row flex-col max-w-6xl">
        <div className="w-1/2 min-w-fit overflow-clip  md:mt-14">
          <Image
            src={src}
            width={400}
            height={500}
            alt="Julia Ayubova"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="py-4 text-justify space-y-4 text-primary-dark dark:text-primary-light">
          <p className="font-semibold text-center md:text-lg font-heading">
            Hello and welcome to my blog!
          </p>
          <p>
            My name is Julia Ayubova, and I am a frontend developer with over 5
            years of experience in the industry.
          </p>
          <p>
          Originally from Moscow, Russia, I spent the last year living in Alanya, Turkey,
         and my current location is in Yerevan, Armenia. However, I guess this is not the final stop in my life.
          </p>
          <p>
            Aside from coding, I have a few hobbies that I enjoy. I love reading
            books, and I try to read at least two books per month. I also enjoy
            sports, especially going to the gym and running. I recently started
            learning to play the piano, because it was my childhood dream. Also
            I have three adorable cats who keep me company while I work from
            home.
          </p>
          <p>
            I started this blog as a way to share my experiences and insights
            with others. I created this blog myself using Next.js.
          </p>
          <p>
            One of the reasons I decided to start this blog is that I've quit
            social media. I wanted to create a platform where I can express
            myself without the distractions that come with social media.
          </p>
          <p>
            I hope you find my content useful and informative. If you have any
            questions or comments, feel free to reach out to me. Let's connect
            and learn together!
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default About;

interface StaticPropsResponse {
  tags: string[]
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async () => {
  try {
    const tags = await getTagsCollection();
    return {
      props: {
        tags
      },
    };
  } catch (error) {
    return {notFound: true};
  }
};