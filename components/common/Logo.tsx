import { FC } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";

const Logo: FC = () => (
  <Image src={logo} height="32px" width="160px" alt="logo" />
);

export default Logo;
