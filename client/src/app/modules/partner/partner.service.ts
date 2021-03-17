import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
@Injectable({
  providedIn: "root",
})
export class PartnerService {
  private envPartner: string = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  public registerUser(id) {
    return this.http.get(`${this.envPartner}/${id}`);
  }

  public getUserData() {
    let headers = new HttpHeaders();
    headers = headers.set(
      "Authorization",
      `Bearer ${
        (this.authService.userData && this.authService.userData.accessToken) ||
        localStorage.getItem("accessToken")
      }`
    );
    return this.http.get(
      `${this.envPartner}/${
        (this.authService.userData && this.authService.userData.user.id) ||
        localStorage.getItem("id")
      }`,
      { headers }
    );
  }

  public updateUser(body) {
    let headers = new HttpHeaders();
    headers = headers.set(
      "Authorization",
      `Bearer ${
        (this.authService.userData && this.authService.userData.accessToken) ||
        localStorage.getItem("accessToken")
      }`
    );
    return this.http.put(
      `${this.envPartner}/${
        (this.authService.userData && this.authService.userData.user.id) ||
        localStorage.getItem("id")
      }`,
      body,
      { headers }
    );
  }
}
