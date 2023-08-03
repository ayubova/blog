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
      <a target={"_blank"} href="https://www.linkedin.com/in/julia-ayubova-a46790120/" className="flex space-x-2 items-center group" rel="noreferrer">
        <LinkedinIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Linkedin</p>
      </a>
      <a target={"_blank"} href="https://wa.me/+37443066019" className="flex space-x-2 items-center group" rel="noreferrer">
        <WhatsappIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Whatsapp</p>
      </a>
      <a target={"_blank"} href="https://t.me/julia_ayubova" className="flex space-x-2 items-center group" rel="noreferrer">
        <TelegramIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Telegram</p>
      </a>
      <a target={"_blank"} href="mailto:ayubova.yuliya@gmail.com" className="flex space-x-2 items-center group" rel="noreferrer">
        <EmailIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Email</p>
      </a>
      <a target={"_blank"} href="https://github.com/ayubova" className="flex space-x-2 items-center group" rel="noreferrer">
        <AiFillGithub
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Github</p>
      </a>
    </div>
  )
}

export default ContactButtons
