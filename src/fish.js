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

    target = target || {};

    if (typeof target !== "object" && typeof target !== "function") {
        target = {};
    }

    if (source) {
        for (var item in source) {
            var src = source[item];
            var dest = target[item];

            if (target === src) {
                continue;
            }

            var srcType = Object.prototype.toString.call(src);
            if (src && ( srcType === "[object Object]" || srcType === "[object Array]" )) {
                if (srcType === "[object Object]") {
                    dest = dest && Object.prototype.toString.call(dest) === "[object Object]" ? dest : {};
                } else {
                    dest = dest && Object.prototype.toString.call(dest) === "[object Array]" ? dest : [];
                }
                target[item] = Fish.propertiesCopy(src, dest);
            } else if (src !== undefined) {
                target[item] = src;
            }
        }
    }

    return target;
};




