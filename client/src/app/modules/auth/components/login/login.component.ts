import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  private user = {
    email: "",
    password: "",
  };
  private errorMessage: string[] = [];
  private showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  loginUser() {
    this.validateErrors();
    this.authService.loginUser(this.user).subscribe((res) => {
      this.user = {
        email: "",
        password: "",
      };
      this.router.navigate(["/partner"]);
    });
  }

  private validateErrors(): void {
    this.errorMessage = [];
    this.showErrorMessage = false;
    if (!this.user.email) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Debes agregar un correo electrónico válido: entre 4 y 20 carácteres."
      );
    }
    if (!this.user.password) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Debes agregar una contraseña correcta válida: entre 4 y 20 carácteres, con una minúscula, una mayúcusla y un carácter especial."
      );
    }
  }
}
