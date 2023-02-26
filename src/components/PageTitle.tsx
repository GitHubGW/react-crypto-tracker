import { Helmet } from "react-helmet-async";

interface PageTitleProps {
  text?: string;
}

const PageTitle = ({ text }: PageTitleProps) => {
  return (
    <Helmet>
      <title>{text}</title>
    </Helmet>
  );
};

export default PageTitle;
