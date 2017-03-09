import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Badge, BadgeProps } from "../Badge";
import { Alert } from "../Alert";

import { MockContext, mockMendix } from "tests/mocks/Mendix";

describe("Badge", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(Badge, props));

    beforeEach(() => {
        window.mx = mockMendix;
        window.mendix = { lib: { MxContext: MockContext } };
    });

    describe("should render the structure", () => {
        it("for badge", () => {
            const badgeProps: BadgeProps = { badgeValue: "0", label: "default" };
            const badgeComponent = createBadge(badgeProps);

            expect(badgeComponent).toBeElement(
                DOM.div(
                    {
                        className: "widget-badge-display"
                    },
                    DOM.span({ className: "widget-badge-text" }, badgeProps.label),
                    DOM.span({ className: "widget-badge badge label-default" }, badgeProps.badgeValue),
                    createElement(Alert)
                )
            );
        });
    });

    it("should render with style 'success'", () => {
        const badgeProps: BadgeProps = {
            microflow: "doNothing",
            style: "success"
        };

        const badgeComponent = createBadge(badgeProps);

        expect(badgeComponent.childAt(1).hasClass("widget-badge badge label-success")).toBe(true);
    });

    describe("without a on click", () => {
        it("should not respond on user click", () => {
            const badgeProps: BadgeProps = {
                microflow: "showPage",
                style: "success"
            };
            spyOn(window.mx.ui, "error");
            spyOn(window.mx.ui, "openForm");
            spyOn(window.mx.ui, "action");

            const badge = createBadge(badgeProps);
            badge.simulate("click");

            expect(window.mx.ui.error).not.toHaveBeenCalled();
            expect(window.mx.ui.openForm).not.toHaveBeenCalled();
            expect(window.mx.ui.action).not.toHaveBeenCalled();
        });
    });
});
