import { DOM, StatelessComponent } from "react";

export const Alert: StatelessComponent<{ message?: string }> = (message) =>
    message
        ? DOM.div({ className: "alert alert-danger widget-badge-alert" }, message)
        : null as any;

Alert.displayName = "Alert";
