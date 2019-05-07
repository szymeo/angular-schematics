import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'

const <%= dasherize(name) %>Routes: Routes = [
    {
        path: '',
        component: null
    }
]

export const <%= classify(name) %>Router: ModuleWithProviders = RouterModule.forChild(<%= dasherize(name) %>Routes)