import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieId: number;
  movieDetails: any = {};
  movieCredits: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.movieId = 0;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieDetails();
      this.loadMovieCredits();
    });
  }
  

  loadMovieDetails() {
    this.apiService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movieDetails = data;
      console.log("Movie Details:", this.movieDetails);
    });
  }
  
  loadMovieCredits() {
    this.apiService.getMovieCredits(this.movieId).subscribe((data: any) => {
      this.movieCredits = data.cast.slice(0, 6); // Pega os seis primeiros atores do elenco
      //console.log("Movie Credits:", this.movieCredits);
    });
  }

  getProductionCompanies() {
    if (this.movieDetails.production_companies) {
      return this.movieDetails.production_companies.map((company: { name: any; }) => company.name).join(', ');
    } else {
      return '';
    }
  }
}
