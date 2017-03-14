import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";

import { createElement } from "react";
import { render, unmountComponentAtNode } from "react-dom";

import BadgeContainer, { OnClickOptions, PageSettings } from "./components/BadgeContainer";

class Badge extends WidgetBase {
    // Attributes from modeler
    private valueAttribute: string;
    private styleAttribute: string;
    private labelAttribute: string;
    private label: string;
    private badgeClass: string;
    private microflow: string;
    onClickEvent: OnClickOptions;
    page: string;
    pageSettings: PageSettings;

    // Internal variables
    private contextObject: mendix.lib.MxObject;

   update(contextObject: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = contextObject;
        this.updateRendering();

        if (callback) {
            callback();
        }
    }

    uninitialize(): boolean {
        unmountComponentAtNode(this.domNode);

        return true;
    }

   private updateRendering() {
        render(createElement(BadgeContainer, {
            badgeClass: this.badgeClass,
            contextObject: this.contextObject,
            label: this.label,
            labelAttribute: this.labelAttribute,
            microflow: this.microflow,
            onClickEvent: this.onClickEvent,
            page: this.page,
            pageSettings: this.pageSettings,
            styleAttribute: this.styleAttribute,
            valueAttribute: this.valueAttribute
       }), this.domNode);
   }
}
// tslint:disable : only-arrow-functions
dojoDeclare("com.mendix.widget.custom.badge.Badge", [ WidgetBase ], (function(Source: any) {
        const result: any = {};
        for (const i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(Badge))
);
