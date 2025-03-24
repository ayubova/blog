/* eslint-disable react/no-unescaped-entities */
import type {NextPage} from "next";
import Image from "next/image";

const src =
  "https://res.cloudinary.com/dynf9cvqt/image/upload/v1678440784/blog/ffsggtpsxgtomq31o5ya.jpg";

const About: NextPage = () => {
  const yearsOfExperience = new Date().getFullYear() - 2018;

  return (
    <div className="pb-20 px-5 flex pt-10 lg:flex-row flex-col lg:space-x-12 lg:max-w-6xl justify-between">
      <div className="w-full min-w-fit overflow-clip  md:mt-14">
        <Image
          src={src}
          width={400}
          height={500}
          alt="Julia Ayubova"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="py-4 text-justify space-y-4 text-primary-dark dark:text-primary-light">
        <p className="font-semibold text-center md:text-lg font-heading pt-8">
          Hello and welcome to my blog!
        </p>
        <p>
          {`My name is Julia Ayubova, and I am a frontend developer with over ${yearsOfExperience}
            years of experience in the industry.`}
        </p>
        <p>
          Originally from Moscow, I’ve lived in Alanya, Turkey, and Yerevan,
          Armenia, before settling in Amsterdam, Netherlands.
        </p>
        <p>
          Beyond coding, I love reading and aim to finish at least two books per
          month. Staying active is important to me, and I enjoy running, working
          out, and recently started learning piano—a childhood dream of mine.
        </p>
        <p>
          In October 2023, I welcomed my son, Alan, into the world, and he has
          become the most special part of my life.
        </p>
        <p>
          I created this blog to share my experiences and insights. After
          quitting social media, I built this space using Next.js to express
          myself without the distractions of traditional platforms.
        </p>
        <p>
          I hope you find my content helpful and inspiring. If you have any
          questions or comments, feel free to reach out. Let’s connect and grow
          together!
        </p>
      </div>
    </div>
  );
};

export default About;
