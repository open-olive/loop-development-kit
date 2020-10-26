"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categories = exports.Category = void 0;
// eslint-disable-next-line no-shadow
var Category;
(function (Category) {
    Category["CONTROLLER"] = "Controller";
    Category["INTELLIGENCE"] = "Intelligence";
    Category["SENSOR"] = "Sensor";
    Category["SIDEKICK"] = "Sidekick";
    Category["UNKNOWN"] = "Unknown";
})(Category = exports.Category || (exports.Category = {}));
exports.categories = [
    Category.UNKNOWN,
    Category.INTELLIGENCE,
    Category.CONTROLLER,
    Category.SENSOR,
    Category.SIDEKICK,
];
exports.default = Category;
