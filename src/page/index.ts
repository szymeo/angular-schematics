// tslint:disable-next-line: max-line-length
import { Rule, SchematicContext, filter, move, mergeWith, MergeStrategy, apply, url, noop, template, chain, branchAndMerge } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';
import { setupOptions } from './setup-options';
import { addDeclarationToNgModule } from '../utils/ng-module-utils';
import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

export function pageSchematic(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        setupOptions(tree, options);

        const movePath = normalize(options.path)

        // console.log('normalize(options.path) ', normalize(options.path))
        // console.log('strings.dasherize(options.name) ', strings.dasherize(options.name))

        options.module = options.module || findModuleFromOptions(tree, options) || ''

        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
            template({
                ...strings,
                ...options,
            }),
            move(movePath),
        ]);

        const rule = chain([
            branchAndMerge(chain([
                mergeWith(templateSource, MergeStrategy.Default),
                addDeclarationToNgModule(options, options.export)
            ]))
        ])
        return rule(tree, _context);
    };
}
