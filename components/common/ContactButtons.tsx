import Link from "next/link"
import {
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from "next-share"
import {AiFillGithub} from "react-icons/ai"

const ContactButtons = () => {
  return (
    <div className="flex flex-col md:flex-row items-start px-4 md:items-center pt-4 md:space-x-8 space-y-4 md:space-y-0 justify-end">
      <Link href="https://www.linkedin.com/in/julia-ayubova-a46790120/">
        <a target={"_blank"} className="flex space-x-2 items-center group">
          <LinkedinIcon
            round
            size={28}
            className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
          />
          <p className="text-highlight-dark group-hover:text-action">Linkedin</p>
        </a>
      </Link>
      <Link href="https://wa.me/+905431673724">
        <a target={"_blank"} className="flex space-x-2 items-center group">
          <WhatsappIcon
            round
            size={28}
            className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
          />
          <p className="text-highlight-dark group-hover:text-action">Whatsapp</p>
        </a>
      </Link>
      <Link href="https://t.me/julia_ayubova">
        <a target={"_blank"} className="flex space-x-2 items-center group">
          <TelegramIcon
            round
            size={28}
            className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
          />
          <p className="text-highlight-dark group-hover:text-action">Telegram</p>
        </a>
      </Link>
      <Link href="mailto:ayubova.yuliya@gmail.com">
        <a target={"_blank"} className="flex space-x-2 items-center group">
          <EmailIcon
            round
            size={28}
            className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
          />
          <p className="text-highlight-dark group-hover:text-action">Email</p>
        </a>
      </Link>
      <Link href="https://github.com/ayubova">
        <a target={"_blank"} className="flex space-x-2 items-center group">
          <AiFillGithub
            size={28}
            className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
          />
          <p className="text-highlight-dark group-hover:text-action">Github</p>
        </a>
      </Link>
    </div>
  )
}

export default ContactButtons
