import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  displayName: string = '';
  darkMode = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAppMode();
  }

  ionViewDidEnter() {
    // Obtém as informações do usuário do serviço de autenticação
    this.authService.getCurrentUserDisplayName().then(displayName => {
      this.displayName = displayName;
  });
  }

  async checkAppMode() {
    const checkIsDarkMode = await Preferences.get({key: 'darkModeActivated'});
    //console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }


  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if(this.darkMode) {
      Preferences.set({key: 'darkModeActivated', value: 'true'}); 
    } else {
      Preferences.set({key: 'darkModeActivated', value: 'false'});
    }
  }

  signOut() {
    this.authService.signOut();
  }

}
