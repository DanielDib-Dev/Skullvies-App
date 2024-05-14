import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL : string = "https://api.themoviedb.org/3/"
  private apiKey : string = "?api_key=282f755939af212c93ae5ff3744dcdc0"
  private languageParam : string = "&language=pt-BR"; // Adiciona o parâmetro de idioma

  constructor(private http : HttpClient) { }

  getPopularMovies(){
    return this.http.get(`${this.baseURL}movie/popular${this.apiKey}${this.languageParam}`);
  }

  getUpComingMovies(){
    return this.http.get(`${this.baseURL}movie/upcoming${this.apiKey}${this.languageParam}`);
  }

  getMovieDetails(movieId: number){
    return this.http.get(`${this.baseURL}movie/${movieId}${this.apiKey}${this.languageParam}`);
  }

  getMovieCredits(movieId: number){
    return this.http.get(`${this.baseURL}movie/${movieId}/credits${this.apiKey}&language=en-US`);
  }
}
