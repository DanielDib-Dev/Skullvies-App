import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { IonRouterOutlet, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favoriteMovies: any[] = [];

  constructor(private authService: AuthService, private apiService: ApiService, private loadingService: LoadingService, private routerOutlet: IonRouterOutlet, private platform: Platform) {}

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.loadFavoriteMovies();
    this.loadingService.showLoading3s();
  }

  async loadFavoriteMovies() {
    const favoriteMovieIds = await this.authService.getFavoriteMovies();
    this.favoriteMovies = await Promise.all(favoriteMovieIds.map(async id => {
      try {
        return await this.apiService.getMovieDetails(id).toPromise();
      } catch (error) {
        console.error('Erro ao recuperar detalhes do filme com ID:', id, error);
        return null;
      }
    }));
    this.favoriteMovies = this.favoriteMovies.filter(movie => movie !== null);
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadFavoriteMovies();
      event.target.complete();
    }, 2000);
  }
}
