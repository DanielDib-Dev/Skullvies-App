import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  movieByQuery: any[] = [];
  query = '';
  page = 1;

  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  constructor(private apiService : ApiService) { }

  ngOnInit() {
    this.loadMovieByQuery();
  }

  loadMovieByQuery() {
    this.apiService.getMovieByQuery(this.query, this.page).subscribe((data: any) =>{
      this.movieByQuery = data.results;
      //console.log("Movies:", this.movieByQuery);
    })
  }

  loadMoreMovies(event: { target: { complete: () => void; }; }) {
    this.page++; // Incrementa a página atual
    this.apiService.getMovieByQuery(this.query, this.page).subscribe((data: any) =>{
      // Adiciona os novos filmes carregados à lista existente
      this.movieByQuery = this.movieByQuery.concat(data.results);

      // Complete o evento de carregamento do Infinite Scroll
      event.target.complete();

      // Verifique se ainda há mais resultados a serem carregados
      if (data.results.length === 0) {
        this.infiniteScroll.disabled = true; // Desabilita o Infinite Scroll se não houver mais resultados
      }
    })
  }

}
