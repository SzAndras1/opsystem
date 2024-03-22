import {CanMatchFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticateService} from "../services/authenticate.service";
import {tap} from "rxjs";

export const canMatchGuardFn: CanMatchFn = () => {
  const router = inject(Router);
  return inject(AuthenticateService)
    .subjectIsLoggedIn
    .pipe(tap((isLoggedIn) => !isLoggedIn && router.navigate(['create'])))
}
