import { Rule, SchematicContext, filter, move, mergeWith, MergeStrategy, apply, url, noop, template } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';
import { setupOptions } from '../utils/setup-options';
// import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

export function appModuleSchematic(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        setupOptions(tree, options);

        const movePath = normalize(options.path)

        // options.module = options.module || findModuleFromOptions(tree, options) || ''

        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
            template({
                ...strings,
                ...options,
            }),
            move(movePath),
        ]);

        console.log(tree.get('[#temporary_file#]'))

        const rule = mergeWith(templateSource, MergeStrategy.Default)
        return rule(tree, _context);
    };
}
