import {Routes} from '@angular/router';
import {UserCreateComponent} from "./user-create/user-create.component";
import {ApplicationListComponent} from "./application-list/application-list.component";
import {canMatchGuardFn} from "./guards/canMatchGuard";

export const routes: Routes = [
  {path: 'create', component: UserCreateComponent},
  {path: 'apps', component: ApplicationListComponent, canMatch: [canMatchGuardFn]},
  {path: '**', redirectTo: 'apps' || 'create'}
];
