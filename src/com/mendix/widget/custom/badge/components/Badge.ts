import { DOM, createElement } from "react";

import * as classNames from "classnames";
import { Alert } from "./Alert";

export interface BadgeProps {
    alertMessage?: string;
    label?: string;
    badgeValue?: string;
    style?: string;
    clickable?: boolean;
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
        }, props.badgeValue),
        createElement(Alert, { message: props.alertMessage })
    );
