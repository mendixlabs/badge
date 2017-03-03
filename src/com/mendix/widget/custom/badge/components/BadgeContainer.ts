import { Component, createElement } from "react";
import { Badge, BadgeOnclick, PageSettings } from "./Badge";

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
    style: string;
}

class BadgeContainer extends Component<BadgeContainerProps, BadgeContainerState> {
    private subscriptionHandles: number[];

    constructor(props: BadgeContainerProps) {
        super(props);

        this.state = {
            badgeValue: this.getValue(props.valueAttribute, ""),
            label: this.getValue(props.labelAttribute, this.props.label),
            style: this.getValue(props.styleAttribute, props.badgeClass)
        };
        this.subscriptionHandles = [];
        this.resetSubscriptions(props.contextObject);
        this.checkConfig();
    }

    render() {
        return createElement(Badge, {
           badgeValue: this.state.badgeValue,
           disabled: this.props.contextObject ? undefined : "disabled",
           label: this.state.label,
           microflow: {
               microflowProps: {
                   guid: this.props.contextObject ? this.props.contextObject.getGuid() : undefined,
                   name: this.props.microflow
               },
               onClickType: this.props.onClickEvent,
               pageProps: {
                   entity: this.props.contextObject ? this.props.contextObject.getEntity() : undefined,
                   guid: this.props.contextObject ? this.props.contextObject.getGuid() : undefined,
                   page: this.props.page,
                   pageSetting: this.props.pageSettings
               }
           },
           style: this.state.style
        });
    }

    componentWillReceiveProps(newProps: BadgeContainerProps) {
        this.resetSubscriptions(newProps.contextObject);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    private updateValues() {
        this.setState({
            badgeValue: this.getValue(this.props.valueAttribute, ""),
            label: this.getValue(this.props.labelAttribute, "new"),
            style: this.getValue(this.props.styleAttribute, this.props.badgeClass)
        });
    }

    private getValue(attributeName: string, defaultValue: string) {
        if (this.props.contextObject) {
            return this.props.contextObject.get(attributeName) as string || defaultValue;
        }
        return defaultValue;
    }

    private resetSubscriptions(contextObject: mendix.lib.MxObject) {
        this.unsubscribe();

        if (contextObject) {
            this.subscriptionHandles.push(window.mx.data.subscribe({
                callback: () => this.updateValues(),
                guid: contextObject.getGuid()
            }));

            [ this.props.valueAttribute, this.props.styleAttribute, this.props.labelAttribute ].forEach((attr) =>
                this.subscriptionHandles.push(window.mx.data.subscribe({
                    attr,
                    callback: () => this.updateValues(),
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

    private checkConfig() {
        const errorMessage: string[] = [];
        if (this.props.onClickEvent === "callMicroflow"
            && !this.props.microflow) {
            errorMessage.push("'On click' call a microFlow is set " +
                "and there is no 'Microflow' Selected in tab Events");
        }
        if (this.props.onClickEvent === "showPage" && !this.props.page) {
            errorMessage.push("'On click' Show a page is set and there is no 'Page' Selected in tab 'Events'");
        }
        if (errorMessage.length > 0) {
            errorMessage.unshift("Error in configuration of the Badge widget");
            this.setState({ alertMessage: errorMessage.join("\n") });
        }
    }
}

export { BadgeContainer as default };
