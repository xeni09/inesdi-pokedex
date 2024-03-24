import c from "classnames";

type Props = React.ComponentProps<"button"> & {
  label: "prev" | "next";
};

import "./button.css";

export function Button({ label, ...rest }: Props) {
  return (
    <button className={c("button", label)} {...rest}>
    </button>
  );
}
