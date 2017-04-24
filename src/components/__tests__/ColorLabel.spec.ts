import { shallow } from "enzyme";
import { DOM, createElement } from "react";
import * as classNames from "classnames";

import { ColorLabel } from "../ColorLabel";
import { BadgeProps } from "../Badge";

describe("ColorLabel", () => {
    const createColorLabel = (props: BadgeProps) => shallow(createElement(ColorLabel, props));

    it("should render the structure", () => {
        const colorLabelProps: BadgeProps = {
            label: "default",
            onClickAction: jasmine.createSpy("onClick"),
            value: "0"
        };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel).toBeElement(
            createElement("div",
                {
                    className: classNames("widget-colorlabel", { "widget-colorlabel-link": colorLabelProps.clickable }),
                    onClick: jasmine.any(Function) as any
                },
                DOM.span({ className: "widget-colorlabel-text" }, colorLabelProps.label),
                DOM.span({
                    className: classNames("label", { [ `label-${colorLabelProps.style}` ]: !!colorLabelProps.style })
                }, colorLabelProps.value)
            )
        );
    });

    it("with a click function should respond to click event", () => {
        const colorLabelProps: BadgeProps = { onClickAction: jasmine.createSpy("onClick") };
        const onClick = colorLabelProps.onClickAction = jasmine.createSpy("onClick");
        const colorLabel = createColorLabel(colorLabelProps);

        colorLabel.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("with the Bootstrap style default should render with class label-default", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "default" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label label-default")).toBe(true);
    });

    it("with the Bootstrap style primary should render with class label-primary", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "primary" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label label-primary")).toBe(true);
    });

    it("with the Bootstrap style success should render with class label-success", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "success" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label label-success")).toBe(true);
    });

    it("with the Bootstrap style info should render with class label-info", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "info" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label label-info")).toBe(true);
    });

    it("with the Bootstrap style warning should render with class label-warning", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "warning" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label label-warning")).toBe(true);
    });

    it("with the Bootstrap style danger should render with class label-danger", () => {
        const colorLabelProps: BadgeProps = { bootstrapStyle: "danger" };
        const colorLabel = createColorLabel(colorLabelProps);

        expect(colorLabel.childAt(1).hasClass("label-danger")).toBe(true);
    });
});
