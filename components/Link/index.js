import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink from "next/link";
import MuiLink from "@material-ui/core/Link";

import useStyles from "./styles";

const NextComposed = React.forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

const Link = props => {
  const {
    activeClassName = "active",
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;
  const router = useRouter();
  const classes = useStyles();
  const isButton =
    props.children &&
    props.children.type &&
    props.children.type.options &&
    props.children.type.options.name === "MuiButton";

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === props.href && activeClassName,
    [classes.noDecorate]: isButton
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} {...other} />;
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      {...other}
    />
  );
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
