import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { Badge, BadgeProps } from "../Badge";
import { Alert } from "../Alert";

describe("Badge", () => {
    const createBadge = (props: BadgeProps) => shallow(createElement(Badge, props));

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
            style: "success"
        };

        const badgeComponent = createBadge(badgeProps);

        expect(badgeComponent.childAt(1).hasClass("widget-badge badge label-success")).toBe(true);
    });
});
