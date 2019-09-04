"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createLogger(name) {
    return function ({}) {
        console.log(`🏞️ [@${name}]`, ...arguments);
    };
}
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map