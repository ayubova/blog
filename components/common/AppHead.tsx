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
      <meta property="og:title" content={title ? title + " | " + APP_NAME : APP_NAME}></meta>
      <meta property="og:description" name="description" content={desc ? desc : defaultDesc}></meta>
      <meta property="og:url" content="https://www.ayubova.com/"></meta>
      <meta property="og:site_name" content="Julia Ayubova"></meta>
      <meta property="og:locale" content="en-US"></meta>
      <meta property="og:image:type" content="image/jpeg"></meta>
      <meta property="og:image:width" content="1920"></meta>
      <meta property="og:image:height" content="1080"></meta>
      <meta property="og:image" content="https://res.cloudinary.com/dynf9cvqt/image/upload/v1691572509/ayubova_meta.png" />
      <meta property="og:type" content="website"></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta property="twitter:title" content={title ? title + " | " + APP_NAME : APP_NAME}></meta>
      <meta property="twitter:description" name="description" content={desc ? desc : defaultDesc}></meta>
      <meta property="twitter:site_name" content="Julia Ayubova"></meta>
      <meta property="twitter:image:type" content="image/jpeg"></meta>
      <meta property="twitter:image:width" content="1920"></meta>
      <meta property="twitter:image:height" content="1080"></meta>
      <meta property="twitter:image" content="https://res.cloudinary.com/dynf9cvqt/image/upload/v1691572509/ayubova_meta.png" />
    </Head>
  );
};

export default AppHead;
