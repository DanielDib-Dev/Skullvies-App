import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastController: ToastController) {
    this.registerForm = this.formBuilder.group({
      displayName: ['', [Validators.required, Validators.minLength(6), this.alphabeticValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), this.passwordMatchValidator.bind(this)]]
    });
  }

  ngOnInit() {
  }

  async register() {
    if (this.registerForm.valid) {
      const displayName = this.registerForm.get('displayName')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      this.authService.register(displayName, email, password);
    } else {
      const toast = await this.toastController.create({
        message: 'Preencha todos os campos corretamente.',
        duration: 3000,
        icon: "alert-circle",
        color: "primary",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
    }
  }

  alphabeticValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const valid = /^[a-zA-Z\s]+$/.test(value);
    return valid ? null : { alphabetic: true };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.registerForm) {
      return null;
    }
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
