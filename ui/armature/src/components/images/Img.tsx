import { clsx } from "clsx";
import { sprinkles } from "../../themes";
import { expandFull, objectCover } from "../../styles/utilities.css";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  absolute?: boolean;
  expand?: boolean;
  cover?: boolean;
}

export const Img = (props: ImageProps) => {
  const { src } = props;
  if (!src) return null;

  return <ImageElement {...props} />;
};

const ImageElement = ({ expand, cover, absolute, className, ...rest }: ImageProps) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img
    {...{
      ...rest,
      className: clsx(expand && expandFull, cover && objectCover, absolute && sprinkles({ position: "absolute" }), className)
    }}
  />
);
