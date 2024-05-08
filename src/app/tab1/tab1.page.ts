import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private apiService : ApiService) {
    this.teste();
  }

  teste() {
    this.apiService.teste().subscribe(data =>{
      console.log(data);
    })
  }

}
