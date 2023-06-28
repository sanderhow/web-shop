import React from "react";
import * as P from "./parts";

const Footer: React.FC = () => {
  return (
    <P.FooterWrapper>
      {`© COPYRIGHT ${new Date().getFullYear()}`}
    </P.FooterWrapper>
  );
};

export default Footer;
