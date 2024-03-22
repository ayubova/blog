"use client"
import {
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from "next-share"
import {AiFillGithub} from "react-icons/ai"
import styles from "./ContactButtons.module.css";

const ContactButtons = () => {
  const linkStyle = "flex space-x-2 items-center group"
  
  return (
    <div className="flex flex-col md:flex-row items-start px-4 md:items-center pt-4 md:space-x-8 space-y-4 md:space-y-0 justify-end">
      <a target={"_blank"} href="https://www.linkedin.com/in/julia-ayubova-a46790120/" className={linkStyle} rel="noreferrer">
        <LinkedinIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Linkedin</p>
      </a>
      <a target={"_blank"} href="https://wa.me/+37443066019" className={linkStyle} rel="noreferrer">
        <WhatsappIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Whatsapp</p>
      </a>
      <a target={"_blank"} href="https://t.me/julia_ayubova" className={linkStyle} rel="noreferrer">
        <TelegramIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Telegram</p>
      </a>
      <a target={"_blank"} href="mailto:ayubova.yuliya@gmail.com" className={linkStyle} rel="noreferrer">
        <EmailIcon
          round
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Email</p>
      </a>
      <a target={"_blank"} href="https://github.com/ayubova" className={linkStyle} rel="noreferrer">
        <AiFillGithub
          size={28}
          className="group-hover:scale-[0.95] group-hover:saturate-100 saturate-0"
        />
        <p className="text-highlight-dark group-hover:text-action">Github</p>
      </a>

      <a href="https://strava.com/athletes/79694763" className={styles.stravaBadge} target="_blank" rel="noreferrer">
        <img src="//badges.strava.com/echelon-sprite-24.png" alt="Strava" />
        <p className="text-highlight-dark hover:text-action ml-8">Strava</p>
      </a>

    </div>
  )
}

export default ContactButtons
