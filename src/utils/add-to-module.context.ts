import * as ts from 'typescript';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { buildRelativePath, ModuleOptions } from '@schematics/angular/utility/find-module';
import { SchematicsException } from '@angular-devkit/schematics';
import { dasherize, classify } from '@angular-devkit/core/src/utils/strings';

const stringUtils = { dasherize, classify }

export class AddToModuleContext {
    // source of the module file
    source: ts.SourceFile;

    // the relative path that points from
    // the module file to the component file
    relativePath: string;

    // name of the component class
    classifiedName: string;
}

export function createAddToModuleContext(host: Tree, options: ModuleOptions | any): AddToModuleContext {

    const result = new AddToModuleContext();

    if (!options.module) {
        throw new SchematicsException(`Module not found.`);
    }

    // Reading the module file
    const text = host.read(options.module);

    if (text === null) {
        throw new SchematicsException(`File ${options.module} does not exist.`);
    }

    const sourceText = text.toString('utf-8');
    result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);

    const componentPath = `/${options.path}/`
        + stringUtils.dasherize(options.name) + '/'
        + stringUtils.dasherize(options.name)
        + '.page';

    result.relativePath = buildRelativePath(options.module, componentPath);

    result.classifiedName = stringUtils.classify(`${options.name}Page`);

    return result;

}
