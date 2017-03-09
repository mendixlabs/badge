import { Component, DOM, StatelessComponent , createElement } from "react";

import * as classNames from "classnames";
import { Alert } from "./Alert";

export type BadgeOnclick = "doNothing" | "showPage" | "callMicroflow";
export type PageSettings = "content" | "popup" | "modal";

export const ValidationAlert: StatelessComponent<{ message: string }> = (props) =>
    DOM.div({ className: "alert alert-danger widget-validation-message" }, props.message);

export interface BadgeProps {
    alertMessage?: string;
    label?: string;
    badgeValue?: string;
    style?: string;
    microflow?: string;
    onClickAction?: () => void;
    disabled?: string;
}

export class Badge extends Component<BadgeProps, { alertMessage?: string }> {
    static defaultProps: BadgeProps = { label: "default", style: "default" };

    constructor(props: BadgeProps) {
        super(props);

        this.state = { alertMessage: props.alertMessage };
    }

    componentWillReceiveProps(newProps: BadgeProps) {
        if (newProps.alertMessage !== this.props.alertMessage) {
            this.setState({ alertMessage: newProps.alertMessage });
        }
    }


    render() {
        return createElement("div",
            {
                className: classNames("widget-badge-display",
                    { "widget-badge-link": !!this.props.microflow }
                ),
                onClick: this.props.onClickAction
            },
            DOM.span({ className: "widget-badge-text" }, this.props.label),
            DOM.span({
                className: classNames("widget-badge", "badge",
                    { [`label-${this.props.style}`]: !!this.props.style }
                )
            }, this.props.badgeValue),
            createElement(Alert, { message: this.state.alertMessage })
        );
    }
}
