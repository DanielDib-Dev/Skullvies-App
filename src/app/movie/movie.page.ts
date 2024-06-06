import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Adicione esta linha

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieId: number;
  movieDetails: any = {};
  movieCredits: any = {};
  isFavorite: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private loadingService : LoadingService, private authService: AuthService) {
    this.movieId = 0;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieDetails();
      this.loadMovieCredits();
      this.checkIfFavorite();
    });
  }

  async checkIfFavorite() {
    // Obter o UID do usuário
    const uid = await this.authService.getCurrentUserUID();
    if (!uid) {
      console.error('Usuário não autenticado');
      return;
    }
  
    // Referência ao documento do usuário no Firestore
    const userDocRef = this.authService.firestoreInstance.collection('users').doc(uid);
    const userDoc = await userDocRef.get().toPromise();
    
    if (userDoc && userDoc.exists) {
      const userData: { favoriteMovies?: number[] } = userDoc.data() || {};
      if (userData && userData.favoriteMovies && userData.favoriteMovies.includes(this.movieId)) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    } else {
      this.isFavorite = false;
    }
  }

  loadMovieDetails() {
    this.apiService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.movieDetails = data;
      //console.log("Movie Details:", this.movieDetails);
    });
  }
  
  async loadMovieCredits() {
    await this.loadingService.showLoading();
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

  // Adicione este método para alternar o status de favorito
  async toggleFavorite() {
    this.isFavorite = !this.isFavorite;

    // Obter o UID do usuário
    const uid = await this.authService.getCurrentUserUID();
    if (!uid) {
      console.error('Usuário não autenticado');
      return;
    }

    // Referência ao documento do usuário no Firestore
    const userDocRef = this.authService.firestoreInstance.collection('users').doc(uid);

    if (this.isFavorite) {
      // Adicionar o ID do filme aos favoritos do usuário
      await userDocRef.update({
        favoriteMovies: firebase.firestore.FieldValue.arrayUnion(this.movieId)
      });
    } else {
      // Remover o ID do filme dos favoritos do usuário
      await userDocRef.update({
        favoriteMovies: firebase.firestore.FieldValue.arrayRemove(this.movieId)
      });
    }
  }

}
