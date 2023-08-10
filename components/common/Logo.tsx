import {FC} from "react";
import Image from "next/image";
import logo from "../../public/logo_1.png";

type Props = {
  menuVisible?: boolean
}

const Logo: FC<Props> = ({menuVisible = true}) => (
  <Image src={logo} height={50} width={menuVisible ? 300 : 200} alt="logo" className="transition-all duration-1500"/>
);

export default Logo;
