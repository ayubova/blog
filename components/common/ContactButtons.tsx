import Link from "next/link";
import {
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "next-share";
import { AiFillGithub } from "react-icons/ai";

const ContactButtons = () => {
  return (
    <div className="flex items-center space-x-3 pt-4">
      <Link href="https://www.linkedin.com/in/julia-ayubova-a46790120/">
        <a target={"_blank"}>
          <LinkedinIcon
            round
            size={36}
            className="hover:scale-[0.95] hover:saturate-100 saturate-20"
          />
        </a>
      </Link>
      <Link href="https://wa.me/+905431673724">
        <a target={"_blank"}>
          <WhatsappIcon
            round
            size={36}
            className="hover:scale-[0.95] hover:saturate-100 saturate-20"
          />
        </a>
      </Link>
      <Link href="https://t.me/julia_ayubova">
        <a target={"_blank"}>
          <TelegramIcon
            round
            size={36}
            className="hover:scale-[0.95] hover:saturate-100 saturate-20"
          />
        </a>
      </Link>
      <Link href="mailto:ayubova.yuliya@gmail.com">
        <a target={"_blank"}>
          <EmailIcon
            round
            size={36}
            className="hover:scale-[0.95] hover:saturate-100 saturate-20"
          />
        </a>
      </Link>
      <Link href="https://github.com/ayubova">
        <a target={"_blank"}>
          <AiFillGithub
            size={36}
            className="hover:scale-[0.95] hover:saturate-100 saturate-20"
          />
        </a>
      </Link>
    </div>
  );
};

export default ContactButtons;
