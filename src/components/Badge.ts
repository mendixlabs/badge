import { DOM, createElement } from "react";

import * as classNames from "classnames";
import { Alert } from "./Alert";

import "../ui/Badge.css";

export interface BadgeProps {
    alertMessage?: string;
    label?: string;
    value?: string;
    style?: string;
    clickable?: boolean;
    notClickable?: boolean;
    onClickAction?: () => void;
}

export const Badge = (props: BadgeProps) =>
    createElement("div", {
            className: classNames("widget-badge-display", { "widget-badge-link": props.clickable }),
            onClick: props.onClickAction
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({
            className: classNames("widget-badge", "badge", { [`label-${props.style}`]: !!props.style })
        }, props.value),
        createElement(Alert, { message: props.alertMessage })
    );
