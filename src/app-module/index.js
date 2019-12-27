"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
const setup_options_1 = require("../utils/setup-options");
const fs = require("fs");
// import { findModuleFromOptions } from '@schematics/angular/utility/find-module';
function appModuleSchematic(options) {
    return (tree, _context) => {
        setup_options_1.setupOptions(tree, options);
        const tempFilesPaths = [];
        const movePath = path_1.normalize(options.path);
        // options.module = options.module || findModuleFromOptions(tree, options) || ''
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
            schematics_1.filter(path => {
                if (path.indexOf('[#temporary_file#]') > -1) {
                    tempFilesPaths.push(path);
                }
                return true;
            }),
            schematics_1.template(Object.assign({}, core_1.strings, options)),
            schematics_1.move(movePath),
        ]);
        const rule = schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Default);
        fs.mkdirSync(`${process.cwd()}/${options.name}`);
        fs.mkdirSync(`${process.cwd()}/${options.name}/components`);
        fs.mkdirSync(`${process.cwd()}/${options.name}/pages`);
        return rule(tree, _context);
    };
}
exports.appModuleSchematic = appModuleSchematic;
//# sourceMappingURL=index.js.map