import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL : string = "https://api.themoviedb.org/3/"
  private apiKey : string = "?api_key=282f755939af212c93ae5ff3744dcdc0"

  constructor(private http : HttpClient) { }

  getPopularMovies(){
    return this.http.get(`${this.baseURL}movie/popular${this.apiKey}`);
  }

  getUpComingMovies(){
    return this.http.get(`${this.baseURL}movie/upcoming${this.apiKey}`);
  }

  getMovieDetails(movieId: number){
    return this.http.get(`${this.baseURL}movie/${movieId}${this.apiKey}`);
  }

}
