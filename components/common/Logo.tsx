import { FC } from "react";
import logo from "../../public/logo_1.png";
import Image from "next/image";

const Logo: FC = () => (
  <Image src={logo} height="50px" width="300px" alt="logo" />
);

export default Logo;
