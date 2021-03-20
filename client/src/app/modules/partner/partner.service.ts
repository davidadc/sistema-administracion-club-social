import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";
@Injectable({
  providedIn: "root",
})
export class PartnerService {
  public envUser: string = `${environment.apiUrl}/user`;
  public envPartner: string = `${environment.apiUrl}/partner`;

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
      `${this.envUser}/${
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
      `${this.envUser}/${
        (this.authService.userData && this.authService.userData.user.id) ||
        localStorage.getItem("id")
      }`,
      body,
      { headers }
    );
  }

  public setProfile(body) {
    let headers = new HttpHeaders();
    headers = headers.set(
      "Authorization",
      `Bearer ${
        (this.authService.userData && this.authService.userData.accessToken) ||
        localStorage.getItem("accessToken")
      }`
    );
    return this.http.post(`${this.envPartner}`, body, { headers });
  }

  public upgradeProfile(id, body) {
    let headers = new HttpHeaders();
    headers = headers.set(
      "Authorization",
      `Bearer ${
        (this.authService.userData && this.authService.userData.accessToken) ||
        localStorage.getItem("accessToken")
      }`
    );
    return this.http.put(`${this.envPartner}/${id}`, body, { headers });
  }
  public deletePartnerProfile(id) {
    let headers = new HttpHeaders();
    headers = headers.set(
      "Authorization",
      `Bearer ${
        (this.authService.userData && this.authService.userData.accessToken) ||
        localStorage.getItem("accessToken")
      }`
    );
    return this.http.delete(`${this.envPartner}/${id}`, { headers });
  }
}
