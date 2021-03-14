import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private envAuth: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  public registerUser(body) {
    return this.http.post(`${this.envAuth}/register`, body);
  }

  public loginUser(body) {
    const { email, password } = body;
    let headers_object = new HttpHeaders({
      Authorization: "Basic " + btoa(`${email}:${password}`),
      "Content-Type": "application/json",
    });

    const httpOptions = {
      headers: headers_object,
    };
    return this.http.post(`${this.envAuth}/login`, {}, httpOptions);
  }
}
