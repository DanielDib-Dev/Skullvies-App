import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL : string = "https://api.themoviedb.org/3/"
  private apiKey : string = "?api_key=282f755939af212c93ae5ff3744dcdc0"

  constructor(private http : HttpClient) { }

  teste(){
    return this.http.get(`${this.baseURL}movie/popular${this.apiKey}`);
  }

}
