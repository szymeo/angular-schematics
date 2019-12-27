"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const find_module_1 = require("@schematics/angular/utility/find-module");
const schematics_1 = require("@angular-devkit/schematics");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const stringUtils = { dasherize: strings_1.dasherize, classify: strings_1.classify };
class AddToModuleContext {
}
exports.AddToModuleContext = AddToModuleContext;
function createAddToModuleContext(host, options) {
    const result = new AddToModuleContext();
    if (!options.module) {
        throw new schematics_1.SchematicsException(`Module not found.`);
    }
    // Reading the module file
    const text = host.read(options.module);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${options.module} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);
    const componentPath = `/${options.path}/`
        + stringUtils.dasherize(options.name) + '/'
        + stringUtils.dasherize(options.name)
        + '.page';
    result.relativePath = find_module_1.buildRelativePath(options.module, componentPath);
    result.classifiedName = stringUtils.classify(`${options.name}Page`);
    return result;
}
exports.createAddToModuleContext = createAddToModuleContext;
//# sourceMappingURL=add-to-module.context.js.map