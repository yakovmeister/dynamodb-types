"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/shim");

require("regenerator-runtime/runtime");

if (global._babelPolyfill && typeof console !== "undefined" && console.warn) {
  console.warn("@babel/polyfill is loaded more than once on this page. This is probably not desirable/intended " + "and may have consequences if different versions of the polyfills are applied sequentially. " + "If you do need to load the polyfill more than once, use @babel/polyfill/noConflict " + "instead to bypass the warning.");
}

global._babelPolyfill = true;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = Object.assign || function __assign(t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }

  return t;
};
/**
 * Iterate through each object member and apply actions specified from callback
 * @param obj JSON Object to be iterated
 * @param callback callback containing the action to be done on each member
 * @returns JSON Object
 */


var map_object = function map_object(obj, callback) {
  return Object.entries(obj).map(callback).reduce(function (previous, current) {
    return __assign({}, previous, current);
  });
};

var isBin = function isBin(value) {
  return value instanceof Buffer;
};

var isNull = function isNull(value) {
  return value === "null" || value === "undefined";
};

var isBinSet = function isBinSet(value) {
  return value.every(function (currentValue) {
    return isBin(currentValue);
  });
};

var isString = function isString(value) {
  return typeof value === "string";
};

var isBoolean = function isBoolean(value) {
  return typeof value === "boolean";
};

var isNumeric = function isNumeric(value) {
  return typeof value === "number";
};

var isStringSet = function isStringSet(value) {
  return value.every(function (currentValue) {
    return isString(currentValue);
  });
};

var isNumericSet = function isNumericSet(value) {
  return value.every(function (currentValue) {
    return isNumeric(currentValue);
  });
};

var identifyAttributeType = function identifyAttributeType(value) {
  var type = 'NULL';

  if (Array.isArray(value)) {
    if (isBinSet(value)) {
      type = 'BS';
    } else if (isNumericSet(value)) {
      type = 'NS';
    } else if (isStringSet(value)) {
      type = 'SS';
    } else {
      type = 'L';
    }
  } else if (isBin(value)) {
    type = 'B';
  } else if (isBoolean(value)) {
    type = 'BOOL';
  } else if (isNumeric(value)) {
    type = 'N';
  } else if (isString(value)) {
    type = 'S';
  } else if (isNull(value)) ;else {
    throw new Error("DynamoDB doesn't support the type of given value.");
  }

  return type;
};

var convertToDynamoSyntax = function convertToDynamoSyntax(value, key) {
  if (!key) {
    return _a = {}, _a[identifyAttributeType(value)] = value, _a;
  }

  return _b = {}, _b[key] = (_c = {}, _c[identifyAttributeType(value)] = value, _c), _b;

  var _a, _b, _c;
};

var iterateAndProcessObject = function iterateAndProcessObject(obj, callback, processCallback) {
  return map_object(obj, function (_a) {
    var key = _a[0],
        value = _a[1];

    if (_typeof(value) === 'object' && !Array.isArray(value)) {
      return _b = {}, _b[key] = callback(value), _b;
    }

    if (!processCallback) {
      return value;
    }

    return processCallback(value, key);

    var _b;
  });
};

var identifyValue = function identifyValue(value) {
  return _a = {}, _a[identifyAttributeType(value)] = value, _a;

  var _a;
};

var write = function write(obj, action) {
  if (action === void 0) {
    action = 'ADD';
  }

  return map_object(obj, function (_a) {
    var key = _a[0],
        value = _a[1];
    return _b = {}, _b[key] = {
      "Action": action,
      "Value": identifyValue(value)
    }, _b;

    var _b;
  });
};

var del = function del(key) {
  return _a = {}, _a[key] = {
    "Action": "DELETE"
  }, _a;

  var _a;
};
/**
 * Provide methods that allows you to generate an AttributeValueUpdate
 * JSON Format
 * @constant
 * @returns instantiated class with AttributeValueUpdate Generator methods.
 */


var typeParseUpdate = function () {
  return new (
  /** @class */
  function () {
    function class_1() {
      this.value = {};
    }

    class_1.prototype.put = function (obj) {
      this.value = __assign({}, this.value, write(obj, 'PUT'));
      return this;
    };

    class_1.prototype.add = function (obj) {
      this.value = __assign({}, this.value, write(obj));
      return this;
    };

    class_1.prototype["delete"] = function (key) {
      this.value = __assign({}, this.value, del(key));
      return this;
    };

    class_1.prototype.getValue = function () {
      return this.value;
    };

    return class_1;
  }())();
}();

var DynamoTypes =
/** @class */
function () {
  function DynamoTypes() {}
  /**
   * Parse JSON object to DynamoDB recognized JSON object.
   * @static
   * @param obj normal JSON object
   * @returns DynamoDB recognized JSON object
   */


  DynamoTypes.parse = function (obj) {
    if (_typeof(obj) !== 'object') {
      return;
    }

    return iterateAndProcessObject(obj, DynamoTypes.parse, convertToDynamoSyntax);
  };
  /**
   * Decode DynamoDB recognized JSON object to JSON object.
   * @static
   * @param obj DynamoDB recognized JSON object
   * @returns normal JSON object
   */


  DynamoTypes.decode = function (obj) {
    if (_typeof(obj) !== 'object') {
      return;
    }

    return iterateAndProcessObject(obj, DynamoTypes.decode);
  };
  /**
   * @static
   * @see typeParseUpdate
   */


  DynamoTypes.parseUpdate = typeParseUpdate;
  return DynamoTypes;
}();

var _default = DynamoTypes;
exports.default = _default;
