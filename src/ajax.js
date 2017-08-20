/**
 * Created by zhongjibing on 2017/8/18.
 */

"use strict";

if (!window.Cobb) {
    window.Cobb = {};
}

Cobb.ajax = function (options) {

    function encodeParam(data, parent) {
        var params = [];
        var dataType = Object.prototype.toString.call(data);
        if (dataType === "[object Object]") {
            for (var item in data) {
                var key = parent === undefined ? item : parent + "." + item;
                if (typeof data[item] === "object") {
                    params.push(encodeParam(data[item], key));
                } else {
                    params.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[item]));
                }
            }
        } else if (dataType === "[object Array]") {
            for (var idx in data) {
                var column = parent === undefined ? idx : parent + "[" + idx + "]";
                if (typeof data[idx] === "object") {
                    params.push(encodeParam(data[idx], column));
                } else {
                    params.push(encodeURIComponent(column) + "=" + encodeURIComponent(data[idx]));
                }
            }
        } else {
            params.push(encodeURI(data));
        }
        return params.join("&");
    }

    var url = options.url || "";
    var data = options.data || {};
    var method = (options.method || "GET").toUpperCase();
    var async = String(options.async).toLowerCase() === "true";
    var contentType = options.contentType;
    var headers = options.headers || {};
    var timeout = options.timeout || 0;
    var onSuccess = options.success || function (data) {return data;};
    var onError = options.error || function (data) {return data;};

    var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    if (method === "GET") {
        url += url.indexOf("?") > -1 ? url.indexOf("=") > -1 ? "&" : "" : "?";
        url += encodeParam(data);
    }

    xhr.open(method, url, async);

    if (method === "POST" && !contentType) {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    }
    if (contentType) {
        xhr.setRequestHeader("Content-Type", contentType);
    }

    for (var header in headers) {
        xhr.setRequestHeader(header, String(headers[header]));
    }

    if (async) {
        xhr.timeout = timeout;
    }

    var rtnData = null;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === window.XMLHttpRequest.DONE) {
            rtnData = {
                status: xhr.status,
                statusText: xhr.statusText,
                responseHeaders: (function () {
                    var responseHeaders = {};
                    var headerArray = (xhr.getAllResponseHeaders() || "").split(/\r\n/);
                    for (var idx in headerArray) {
                        if (headerArray[idx]) {
                            var pair = headerArray[idx].split(/:\s*/);
                            responseHeaders[pair[0]] = pair[1];
                        }
                    }
                    return responseHeaders;
                })(),
                responseData: xhr.response
            };

            console.log(rtnData);

            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                rtnData = onSuccess(rtnData.responseData);
            } else {
                rtnData = onError(rtnData);
            }
        }
    };

    xhr.send(method === "POST" ? data : null);

    return rtnData;
};

