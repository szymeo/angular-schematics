
import * as config_1 from '@schematics/angular/utility/config';
import * as project_1 from '@schematics/angular/utility/project'
import * as parse_name_1 from '@schematics/angular/utility/parse-name';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';

export function setupOptions(host: Tree, options: any) {
    const workspace = config_1.getWorkspace(host);
    if (!options.project) {
        options.project = Object.keys(workspace.projects)[0];
    }
    const project = project_1.getProject(workspace, options.name);
    if (options.path === undefined) {
        options.path = project_1.buildDefaultPath(project);
    }
    const parsedPath = parse_name_1.parseName(options.path, options.name);
    options.name = parsedPath.name;
    options.path = parsedPath.path;
    return host;
}
//# sourceMappingURL=setup-options.js.map