import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type LinkProps = Omit<RouterLinkProps, "className"> & {
  classes?: string;
};

const classInit =
  "font-medium text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2";

export const Link = ({ classes = "", ...linkProps }: LinkProps) => {
  return (
    <RouterLink
      {...linkProps}
      className={`${classInit} ${classes}`}
    />
  );
};