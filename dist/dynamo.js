"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeParseUpdate = typeParseUpdate;
exports.typeParse = void 0;

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

var map_object = function map_object(obj, callback) {
  return Object.entries(obj).map(callback).reduce(function (previous, current) {
    return __assign({}, previous, current);
  });
};

var typeParse = function typeParse(obj) {
  if (!Object.keys(obj)) {
    return;
  }

  return iterateAndConvertObject(obj);
};

exports.typeParse = typeParse;

function typeParseUpdate() {
  var _this = this;

  var value = {};
  return {
    put: function put(obj) {
      value = __assign({}, value, map_object(obj, function (_a) {
        var key = _a[0],
            value = _a[1];
        return _b = {}, _b[key] = {
          "Action": "PUT",
          "Value": (_c = {}, _c[identifyAttributeType(value)] = value, _c)
        }, _b;

        var _b, _c;
      }));
      return _this;
    },
    add: function add(obj) {
      value = __assign({}, value, map_object(obj, function (_a) {
        var key = _a[0],
            value = _a[1];
        return _b = {}, _b[key] = {
          "Action": "ADD",
          "Value": (_c = {}, _c[identifyAttributeType(value)] = value, _c)
        }, _b;

        var _b, _c;
      }));
      return _this;
    },
    "delete": function _delete(key) {
      value = __assign({}, value, (_a = {}, _a[key] = {
        "Action": "DELETE"
      }, _a));
      return _this;

      var _a;
    },
    getValue: function getValue() {
      return value;
    }
  };
}

var identifyAttributeType = function identifyAttributeType(value) {
  var type = 'NULL';

  if (Array.isArray(value)) {
    if (isBinSet(value)) {
      type = 'BS';
    } else if (isNumericSet(value)) {
      type = 'NS';
    } else if (isStringSet(value)) {
      type = 'SS';
    }

    type = 'L';
  } else if (isBin(value)) {
    type = 'B';
  } else if (isBoolean(value)) {
    type = 'BOOL';
  } else if (isNumeric(value)) {
    type = 'N';
  } else if (isString(value)) {
    type = 'S';
  } else if (isNull(value)) ;else {
    throw new Error('Invalid type.');
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

var iterateAndConvertObject = function iterateAndConvertObject(obj) {
  map_object(obj, function (_a) {
    var key = _a[0],
        value = _a[1];

    if (Object.keys(value)) {
      return _b = {}, _b[key] = typeParse(value), _b;
    }

    return convertToDynamoSyntax(value, key);

    var _b;
  });
};
