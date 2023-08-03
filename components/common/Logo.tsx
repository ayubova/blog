import {FC} from "react";
import Image from "next/image";
import logo from "../../public/logo_1.png";

const Logo: FC = () => (
  <Image src={logo} height={50} width={300} alt="logo" />
);

export default Logo;
