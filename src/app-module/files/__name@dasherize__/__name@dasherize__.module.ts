import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { <%= classify(name) %>Router } from './<%= dasherize(name) %>.routes'

@NgModule({
    imports: [
        CommonModule,
        <%= classify(name) %>Router
    ],
    declarations: [

    ],
    exports: [RouterModule]
})
export class <%= classify(name) %>Module { }
