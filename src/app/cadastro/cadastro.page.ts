import { Component, OnInit, ViewChild } from '@angular/core';
import type { IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  displayName: string ='';
  email: string ='';
  password: string='';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.displayName, this.email, this.password);
  }

  inputModel = '';

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev: { target: any; }) {
    const value = ev.target!.value;

    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^a-zA-Z\s]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

}
