/**
 * Created by zhongjibing on 2017/8/8.
 */

"use strict";

var Fish = {};

/**
 * Copy the property values of the given source object into the given target object
 *
 * @param source
 *      the source object
 * @param target
 *      the target object
 * @returns {*}
 *      the target object
 */
Fish.propertiesCopy = function (source, target) {
    debugger;

    if (!source || typeof(source) !== "object") {
        target = source;
    } else {
        if (!target && Object.prototype.toString.call(source) === "[object Object]") {
            target = {};
        }

        if (!target && Object.prototype.toString.call(source) === "[object Array]") {
            target = [];
        }

        for (var i in source) {
            if (source[i] && !target[i]) {
                if (Object.prototype.toString.call(source[i]) === "[object Object]") {
                    target[i] = {};
                }
                if (Object.prototype.toString.call(source[i]) === "[object Array]") {
                    target[i] = [];
                }
            }

            if (typeof(source[i]) === "object") {
                this.propertiesCopy(source[i], target[i]);
            } else {
                target[i] = source[i];
            }
        }
    }

    return target;
};




