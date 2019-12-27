"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_to_module_context_1 = require("./add-to-module.context");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
function addDeclaration(host, options) {
    const context = add_to_module_context_1.createAddToModuleContext(host, options);
    const modulePath = options.module || '';
    const declarationChanges = ast_utils_1.addDeclarationToModule(context.source, modulePath, context.classifiedName, context.relativePath);
    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof change_1.InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);
}
;
function addExport(host, options) {
    const context = add_to_module_context_1.createAddToModuleContext(host, options);
    const modulePath = options.module || '';
    const exportChanges = ast_utils_1.addExportToModule(context.source, modulePath, context.classifiedName, context.relativePath);
    const exportRecorder = host.beginUpdate(modulePath);
    for (const change of exportChanges) {
        if (change instanceof change_1.InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(exportRecorder);
}
;
function addDeclarationToNgModule(options, exports) {
    return (host) => {
        addDeclaration(host, options);
        if (exports) {
            addExport(host, options);
        }
        return host;
    };
}
exports.addDeclarationToNgModule = addDeclarationToNgModule;
//# sourceMappingURL=ng-module-utils.js.map