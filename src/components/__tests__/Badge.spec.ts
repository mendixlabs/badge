import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Badge, BadgeProps } from "../Badge";
import { Alert } from "../Alert";

describe("Badge", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(Badge, props));

    it("should render the structure", () => {
        const badgeProps: BadgeProps = {
            label: "Custom Label",
            onClickAction: jasmine.createSpy("onClick"),
            value: "0"
        };
        const badge = createBadge(badgeProps);

        expect(badge).toBeElement(
            DOM.div(
                {
                    className: "widget-badge",
                    onClick: jasmine.any(Function) as any
                },
                DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                DOM.span({ className: "widget-badge badge label-default" }, badgeProps.value)
            )
        );
    });

    it("with click function should respond to click event", () => {
        const badgeProps: BadgeProps = { onClickAction: jasmine.createSpy("onClick") };
        const onClick = badgeProps.onClickAction = jasmine.createSpy("onClick");
        const badge = createBadge(badgeProps);

        badge.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with style default should render with class btn-default", () => {
        const badgeProps: BadgeProps = { style: "default" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-default")).toBe(true);
    });

    it("with style default should render with class btn-primary", () => {
        const badgeProps: BadgeProps = { style: "primary" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-primary")).toBe(true);
    });

    it("with style default should render with class btn-success", () => {
        const badgeProps: BadgeProps = { style: "success" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-success")).toBe(true);
    });

    it("with style default should render with class btn-sucinfocess", () => {
        const badgeProps: BadgeProps = { style: "info" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-info")).toBe(true);
    });

    it("with style default should render with class btn-warning", () => {
        const badgeProps: BadgeProps = { style: "warning" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-warning")).toBe(true);
    });

    it("with style default should render with class btn-danger", () => {
        const badgeProps: BadgeProps = { style: "danger" };
        const badge = createBadge(badgeProps);

        expect(badge.childAt(1).hasClass("label-danger")).toBe(true);
    });
});
