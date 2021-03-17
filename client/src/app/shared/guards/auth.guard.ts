import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    if (this.authService.existsToken() || localStorage.getItem("accessToken")) {
      return of(true);
    } else {
      this.router.navigate(["/login"]);
      return of(false);
    }
  }
}
