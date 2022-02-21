import { Helmet } from "react-helmet-async";

interface HelmetTitleProps {
  text?: string;
}

const HelmetTitle = ({ text }: HelmetTitleProps) => {
  return (
    <Helmet>
      <title>{text}</title>
    </Helmet>
  );
};

export default HelmetTitle;
