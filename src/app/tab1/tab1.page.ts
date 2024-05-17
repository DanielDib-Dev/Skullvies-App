import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  popularMovies: any[] = []; // Array para armazenar os filmes populares
  upcomingMovies: any[] = [];

  constructor(private apiService : ApiService, private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadPopularMovies(); // Chama a função para buscar os filmes populares quando o componente é inicializado
    this.loadUpComingMovies();
  }

  async loadPopularMovies() {
    await this.loadingService.showLoading();
    this.apiService.getPopularMovies().subscribe((data: any) => {
      this.popularMovies = data.results;
      //console.log("Popular Movies:", this.popularMovies);
      this.loadingService.dismissLoading();
    });
  } 
  
  loadUpComingMovies() {
    this.apiService.getUpComingMovies().subscribe((data: any) =>{
      this.upcomingMovies = data.results;
      //console.log("Upcoming Movies:", this.upcomingMovies);
    })
  }

}
