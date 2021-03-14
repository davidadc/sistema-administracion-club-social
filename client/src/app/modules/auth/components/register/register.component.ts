import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/user.interface";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  private newUser: User = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  private confirmPassword: string = "";
  private errorMessage: string[] = [];
  private showErrorMessage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  registerNewUser(): void {
    this.validateErrors();
    this.authService.registerUser(this.newUser).subscribe((res) => {
      this.newUser = {
        name: "",
        email: "",
        phone: "",
        password: "",
      };
      this.confirmPassword = "";
      this.router.navigate(["/login"]);
    });
  }

  private validateErrors(): void {
    this.errorMessage = [];
    this.showErrorMessage = false;
    if (!this.newUser.name) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Debes agregar un nombre válido: entre 4 y 20 carácteres."
      );
    }
    if (!this.newUser.email) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Debes agregar un correo electrónico válido: entre 4 y 20 carácteres."
      );
    }
    if (!this.newUser.phone) {
      this.showErrorMessage = true;
      this.errorMessage.push("Debes agregar un teléfono nacional válido.");
    }
    if (!this.newUser.password) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Debes agregar una contraseña correcta válida: entre 4 y 20 carácteres, con una minúscula, una mayúcusla y un carácter especial."
      );
    }

    if (!this.confirmPassword) {
      this.showErrorMessage = true;
      this.errorMessage.push("Debes confirmar tu contraseña correcta.");
    }

    if (this.newUser.password != this.confirmPassword) {
      this.showErrorMessage = true;
      this.errorMessage.push(
        "Tu contraseña y la confirmación deben ser iguales."
      );
    }
  }
}
