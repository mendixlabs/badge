import { Component, DOM, createElement } from "react";
import { Badge, BadgeProps } from "./components/Badge";
import { Alert } from "./components/Alert";
import BadgeContainer, { BadgeContainerProps } from "./components/BadgeContainer";

declare function require(name: string): string;

type VisibilityMap = {
    [P in keyof BadgeContainerProps]: boolean;
};

// tslint:disable-next-line class-name
export class preview extends Component<BadgeContainerProps, {}> {
    render() {
        const message = BadgeContainer.validateProps(this.props);
        return DOM.div({ ref: this.parentInline },
            message && Alert({ message }),
            createElement(Badge, this.transformProps(this.props))
        );
    }

    private parentInline(node?: HTMLElement | null) {
        // Temporary fix, the web modeler add a containing div, to render inline we need to change it.
        if (node && node.parentElement) {
            node.parentElement.style.display = "inline-block";
        }
    }

    private transformProps(props: BadgeContainerProps): BadgeProps {
        const valueAttribute = props.valueAttribute ? props.valueAttribute.split(".")[2] : "";
        return {
            badgeType: props.badgeType,
            bootstrapStyle: props.bootstrapStyle,
            className: props.class,
            clickable: false,
            style: BadgeContainer.parseStyle(props.style),
            value: valueAttribute ? "[" + valueAttribute + "]" : props.badgeValue || "Badge"
        };
    }
}

export function getPreviewCss() {
    return require("./ui/Badge.css");
}

export function getVisibleProperties(valueMap: BadgeContainerProps, visibilityMap: VisibilityMap) {
    if (valueMap.onClickEvent === "doNothing") {
        visibilityMap.microflow = false;
        visibilityMap.page = false;
    } else if (valueMap.onClickEvent === "callMicroflow") {
        visibilityMap.microflow = true;
        visibilityMap.page = false;
    } else if (valueMap.onClickEvent === "showPage") {
        visibilityMap.microflow = false;
        visibilityMap.page = true;
    }

    return visibilityMap;
}
