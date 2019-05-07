import { Rule, SchematicContext, filter, move, mergeWith, MergeStrategy, apply, url, noop, template } from '@angular-devkit/schematics';
import { Tree } from '@angular-devkit/schematics';
import { normalize } from 'path';
import { strings } from '@angular-devkit/core';
import { setupOptions } from '../utils/setup-options';
import * as fs from 'fs';
// import { findModuleFromOptions } from '@schematics/angular/utility/find-module';

export function appModuleSchematic(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        setupOptions(tree, options);

        const tempFilesPaths: any = []
        const movePath = normalize(options.path)

        // options.module = options.module || findModuleFromOptions(tree, options) || ''

        const templateSource = apply(url('./files'), [
            options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
            filter(path => {
                if (path.indexOf('[#temporary_file#]') > -1) {
                    tempFilesPaths.push(path)
                }

                return true
            }),
            template({
                ...strings,
                ...options,
            }),
            move(movePath),
        ]);

        
        const rule = mergeWith(templateSource, MergeStrategy.Default)
        
        fs.mkdirSync(`${process.cwd()}/${options.name}`)
        fs.mkdirSync(`${process.cwd()}/${options.name}/components`)
        fs.mkdirSync(`${process.cwd()}/${options.name}/pages`)

        return rule(tree, _context);
    };
}
