"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
function deleteTempFiles() {
    return (host) => {
        // console.log(host.getDir(options.path || './src/app'))
        // const a1 = rule
        const tempPaths = host.actions.filter(({ path }) => path.indexOf('[#temporary_file#]') > -1).map(action => action.path);
        tempPaths.forEach(path => {
            if (host.exists(path)) {
                console.log(path_1.join(process.cwd(), path));
                fs.unlinkSync(path);
            }
        });
        return host;
    };
}
exports.deleteTempFiles = deleteTempFiles;
//# sourceMappingURL=delete-temp-files.js.map