import { FC } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

interface Props {
  url: string;
  title?: string;
  quote?: string;
}

const Share: FC<Props> = ({ url, title, quote }): JSX.Element => {
  return (
    <div className="flex items-center space-x-3">
      <p className="font-semibold dark:text-primary-light text-primary-main">
        Share:
      </p>
      <FacebookShareButton url={url} title={title} quote={quote}>
        <FacebookIcon round size={28} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={28} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} source={quote}>
        <LinkedinIcon round size={28} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={title} separator={":: "}>
        <WhatsappIcon round size={28} />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon round size={28} />
      </TelegramShareButton>
    </div>
  );
};

export default Share;
