import {FC} from "react";
import Head from "next/head";

interface Props {
  title?: string;
  desc?: string;
}

export const APP_NAME = "Julia Ayubova";

//TODO add desc from props or delete prop
const defaultDesc =
  "Welcome to my personal blog! Here you'll find articles on topics ranging from web technology and to personal development and lifestyle. Join me on my journey and let's explore the world together.";

const AppHead: FC<Props> = ({title, desc}): JSX.Element => {
  return (
    <Head>
      <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
      <meta content={desc ? desc : defaultDesc} name="description" />
      <meta property="og:image" content="https://res.cloudinary.com/dynf9cvqt/image/upload/v1691572509/ayubova_meta.png" />
    </Head>
  );
};

export default AppHead;
