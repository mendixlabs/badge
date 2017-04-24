import { DOM, SFC, createElement } from "react";
import * as classNames from "classnames";

import "../ui/ColorLabel.css";
import { BadgeProps } from "./Badge";

export const ColorLabel: SFC<BadgeProps> = ({
    bootstrapStyle, className, clickable, label, onClickAction, value, style
}) =>
    createElement("div",
        {
            className: classNames("widget-colorlabel", { "widget-colorlabel-link": clickable }),
            onClick: onClickAction,
            style
        },
        DOM.span({ className: "widget-colorlabel-text" }, label),
        DOM.span({ className: classNames("label", { [`label-${bootstrapStyle}`]: !!bootstrapStyle }) }, value)
    );
