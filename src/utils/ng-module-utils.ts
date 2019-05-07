import { Rule, Tree } from '@angular-devkit/schematics';
import { ModuleOptions } from '@schematics/angular/utility/find-module';
import { createAddToModuleContext } from './add-to-module.context';
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils'
import { InsertChange } from '@schematics/angular/utility/change';

function addDeclaration(host: Tree, options: ModuleOptions) {

    const context = createAddToModuleContext(host, options);
    const modulePath = options.module || '';

    const declarationChanges = addDeclarationToModule(
        context.source,
        modulePath,
        context.classifiedName,
        context.relativePath);

    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
        if (change instanceof InsertChange) {
            declarationRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(declarationRecorder);
};

function addExport(host: Tree, options: ModuleOptions) {
    const context = createAddToModuleContext(host, options);
    const modulePath = options.module || '';

    const exportChanges = addExportToModule(
        context.source,
        modulePath,
        context.classifiedName,
        context.relativePath);

    const exportRecorder = host.beginUpdate(modulePath);

    for (const change of exportChanges) {
        if (change instanceof InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(exportRecorder);
};

export function addDeclarationToNgModule(options: ModuleOptions, exports: boolean): Rule {
    return (host: Tree) => {
        addDeclaration(host, options);
        if (exports) {
            addExport(host, options);
        }
        return host;
    };
}
