import {FC} from "react";
import Image from "next/image";
import {Player} from "@lottiefiles/react-lottie-player";
import logo from "../../public/logo_1.png";

type Props = {
  menuVisible?: boolean
}

const Logo: FC<Props> = ({menuVisible = true}) => {

  return (
    <div className="flex items-center">
      <div>
        <Image src={logo} height={50} width={menuVisible ? 300 : 200} alt="logo" className="transition-all duration-1500"/>
      </div>
      
      {menuVisible && (
        <Player
          src="https://lottie.host/f177dd1a-edbd-4015-a192-16a8c8b9071e/tMc4JPMIch.json"
          className="w-24 h-14"
          loop
          autoplay
        />
      )}  
    </div>
  );
}

export default Logo;
