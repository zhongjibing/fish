var JsonFormatter = {};

"use strict";

JsonFormatter.format = function (json, optional) {
    if (!json) {
        return json;
    }

    optional = optional || {};
    var indent = optional["indent"] || 0;

    var padding = "";
    for (var i = 0; i < indent; i++) {
        padding += "    ";
    }

    var type = Object.prototype.toString.call(json);
    if (type !== "[object Number]" && type !== "[object String]" && type !== "[object Object]" && type !== "[object Array]") {
        return json;
    }

    if (type === "[object String]") {
        try {
            json = eval("(" + json + ")");
        } catch (e) {
            return json;
        }
    }

    type = Object.prototype.toString.call(json);

    if (type !== "[object Object]" && type !== "[object Array]") {
        return String(json);
    }

    var formatted = [(type === "[object Object]" ? "{" : "[") + "\r\n"];

    for (var item in json) {
        formatted.push(padding + "    " + (type === "[object Object]" || type === "[object Function]" ? '"' + item + '": ' : ""));

        var value = json[item];
        var subType = Object.prototype.toString.call(value);
        if (subType === "[object Object]" || subType === "[object Array]") {
            formatted.push(JsonFormatter.format(value, {"indent": indent + 1}))
        } else if (subType === "[object Number]") {
            formatted.push(value);
        } else {
            formatted.push(String(value));
        }
        formatted.push(",\r\n");
    }

    if (formatted.length > 1) {
        formatted.pop();
        formatted.push("\r\n");
    }

    formatted.push(padding + (type === "[object Object]" ? "}" : "]"));

    return formatted.join("");
};
