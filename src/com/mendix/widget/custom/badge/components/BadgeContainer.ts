import { Component, createElement } from "react";

import { Badge, BadgeOnclick, PageSettings } from "./Badge";
import { Alert } from "./Alert";

interface BadgeContainerProps {
    contextObject: mendix.lib.MxObject;
    valueAttribute: string;
    styleAttribute: string;
    labelAttribute: string;
    label: string;
    badgeClass: string;
    microflow: string;
    onClickEvent: BadgeOnclick;
    page: string;
    pageSettings: PageSettings;
}

interface BadgeContainerState {
    alertMessage?: string;
    badgeValue: string;
    label: string;
    showAlert?: boolean;
    style: string;
}

class BadgeContainer extends Component<BadgeContainerProps, BadgeContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BadgeContainerProps) {
        super(props);

        this.state = {
            alertMessage: this.checkConfig(),
            badgeValue: this.getValue(props.contextObject, props.valueAttribute, ""),
            label: this.getValue(props.contextObject, props.labelAttribute, this.props.label),
            showAlert: !!this.checkConfig(),
            style: this.getValue(props.contextObject, props.styleAttribute, props.badgeClass)
        };
        this.subscriptionHandles = [];
        this.resetSubscriptions(props.contextObject);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    render() {
        if (this.state.showAlert) {
            return createElement(Alert, { message: this.state.alertMessage });
        }

        return createElement(Badge, {
            alertMessage: this.state.alertMessage,
            badgeValue: this.state.badgeValue,
            disabled: this.props.contextObject ? undefined : "disabled",
            label: this.state.label,
            microflow: this.props.microflow,
            onClickAction: this.handleOnClick,
            style: this.state.style
        });
    }

    componentWillReceiveProps(newProps: BadgeContainerProps) {
        this.resetSubscriptions(newProps.contextObject);
        this.updateValues(newProps.contextObject);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    private updateValues(contextObject: mendix.lib.MxObject) {
        this.setState({
            badgeValue: this.getValue(contextObject, this.props.valueAttribute, ""),
            label: this.getValue(contextObject, this.props.labelAttribute, "new"),
            style: this.getValue(contextObject, this.props.styleAttribute, this.props.badgeClass)
        });
    }

    private getValue(contextObject: mendix.lib.MxObject, attributeName: string, defaultValue: string) {
        if (contextObject) {
            return contextObject.get(attributeName) as string || defaultValue;
        }
        return defaultValue;
    }

    private resetSubscriptions(contextObject: mendix.lib.MxObject) {
        this.unsubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateValues(contextObject),
                guid: contextObject.getGuid()
            }));

            [ this.props.valueAttribute, this.props.styleAttribute, this.props.labelAttribute ].forEach((attr) =>
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    attr,
                    callback: () => this.updateValues(contextObject),
                    guid: contextObject.getGuid()
                }))
            );
        }
    }

    private unsubscribe() {
        if (this.subscriptionHandles) {
            this.subscriptionHandles.forEach((handle) => window.mx.data.unsubscribe(handle));
        }
    }

    private checkConfig(): string {
        let errorMessage: string = "";
        if (this.props.onClickEvent === "callMicroflow" && !this.props.microflow) {
            errorMessage = "on click microflow is required";
        } else if (this.props.onClickEvent === "showPage" && !this.props.page) {
            errorMessage = "on click page is required";
        }
        if (errorMessage) {
            errorMessage = `Error in progress circle configuration: ${errorMessage}`;
        }

        return errorMessage;
    }

    private handleOnClick() {
        if (this.props.onClickEvent === "callMicroflow"
            && this.props.microflow && this.props.contextObject.getGuid()) {
            window.mx.ui.action(this.props.microflow, {
                error: (error) => {
                    this.setState({
                        alertMessage:
                        `Error while executing microflow: ${this.props.microflow}: ${error.message}`,
                        showAlert: false
                    });
                },
                params: {
                    applyto: "selection",
                    guids: [ this.props.contextObject.getGuid() ]
                }
            });
        } else if (this.props.onClickEvent === "showPage"
            && this.props.page && this.props.contextObject.getGuid()) {
            const context = new mendix.lib.MxContext();
            context.setTrackId(this.props.contextObject.getGuid());
            context.setTrackEntity(this.props.contextObject.getEntity());

            window.mx.ui.openForm(this.props.page, {
                 error: (error) =>
                    this.setState({
                        alertMessage: `Error while opening page ${this.props.page}: ${error.message}`,
                        showAlert: false
                    }),
                context,
                location: this.props.pageSettings
            });
        }
    }
}

export { BadgeContainer as default };
