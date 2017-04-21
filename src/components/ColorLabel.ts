import { DOM, createElement } from "react";
import * as classNames from "classnames";

import "../ui/ColorLabel.css";
import { BadgeProps } from "./Badge";

export const ColorLabel = (props: BadgeProps) =>
    createElement("div",
        {
            className: classNames("widget-colorlabel", { "widget-colorlabel-link": props.clickable }),
            onClick: props.onClickAction
        },
        DOM.span({ className: "widget-colorlabel-text" }, props.label),
        DOM.span({ className: classNames("label", { [`label-${props.style}`]: !!props.style }) }, props.value)
    );
