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
      <p className="font-semibold text-primary-dark dark:text-primary">
        Share:
      </p>
      <FacebookShareButton url={url} title={title} quote={quote}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} source={quote}>
        <LinkedinIcon round size={32} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={title} separator={":: "}>
        <WhatsappIcon round size={32} />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon round size={32} />
      </TelegramShareButton>
    </div>
  );
};

export default Share;
