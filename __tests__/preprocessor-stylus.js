const styles = `
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = new Proxy({}, {
    get(target, prop) {
        return prop;
    }
});
`;

module.exports = {
    process() {
        return styles;
    },
};
