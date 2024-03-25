import {Routes} from '@angular/router';
import {UserCreateComponent} from "./user-create/user-create.component";
import {ApplicationListComponent} from "./application-list/application-list.component";
import {canMatchGuardFn} from "./guards/canMatchGuard";
import {ApplicationCreateComponent} from "./application-create/application-create.component";
import {ApplicationViewComponent} from "./application-view/application-view.component";
import {ApplicationInstalledComponent} from "./application-installed/application-installed.component";

export const routes: Routes = [
  {path: 'create/user', component: UserCreateComponent},
  {path: 'apps', component: ApplicationListComponent, canMatch: [canMatchGuardFn]},
  {path: 'installed', component: ApplicationInstalledComponent, canMatch: [canMatchGuardFn]},
  {path: 'create/app', component: ApplicationCreateComponent, canMatch: [canMatchGuardFn]},
  {path: 'app/:appId', component: ApplicationViewComponent, canMatch: [canMatchGuardFn]},
  {path: '**', redirectTo: 'apps' || 'create/user'}
];
