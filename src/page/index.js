"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: max-line-length
const schematics_1 = require("@angular-devkit/schematics");
const path_1 = require("path");
const core_1 = require("@angular-devkit/core");
const setup_options_1 = require("./setup-options");
const ng_module_utils_1 = require("../utils/ng-module-utils");
const find_module_1 = require("@schematics/angular/utility/find-module");
function pageSchematic(options) {
    return (tree, _context) => {
        setup_options_1.setupOptions(tree, options);
        const movePath = path_1.normalize(options.path);
        // console.log('normalize(options.path) ', normalize(options.path))
        // console.log('strings.dasherize(options.name) ', strings.dasherize(options.name))
        options.module = options.module || find_module_1.findModuleFromOptions(tree, options) || '';
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            options.spec ? schematics_1.noop() : schematics_1.filter(path => !path.endsWith('.spec.ts')),
            schematics_1.template(Object.assign({}, core_1.strings, options)),
            schematics_1.move(movePath),
        ]);
        const rule = schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Default),
                ng_module_utils_1.addDeclarationToNgModule(options, options.export)
            ]))
        ]);
        return rule(tree, _context);
    };
}
exports.pageSchematic = pageSchematic;
//# sourceMappingURL=index.js.map