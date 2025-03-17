import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {take} from "rxjs";
import {map} from "rxjs/operators";
import {AuthGuardState} from "./states/auth-guard-state/auth-guard.state";
import {Store} from "@ngrx/store";
import {selectIsAuthenticated} from "./states/auth-guard-state/auth-guard.selector";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store<{ authGuard: AuthGuardState }>);


  return store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['/login']);
          return false;
        }
          console.log("prdni")
        return true;
      })
  );
};
