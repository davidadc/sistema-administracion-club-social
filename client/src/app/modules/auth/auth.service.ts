import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private envAuth: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  public registerUser(body) {
    console.log(body);
    return this.http.post(`${this.envAuth}/register`, body);
  }
}
