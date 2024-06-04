import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  email: string ='';
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  recoverPassword() {
    this.authService.recoverPassword(this.email);
  }
}
