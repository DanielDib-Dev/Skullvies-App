import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastController: ToastController) { }

  // Método para criar um novo usuário
  async signUpWithEmail(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  // Método para fazer login de um usuário
  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['tabs']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Usuário/Senha incorretos',
        duration: 3000,
        icon: "lock-closed",
        color: "primary",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
    }
  }

  // Método para fazer login de um usuário pelo google
  async googleLogin() {
    try {
      await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['tabs']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Erro ao fazer login.',
        duration: 3000,
        icon: "lock-closed",
        color: "primary",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
    }
  }

  //Redefinição de senha
  async recoverPassword(email: string) {
    try{
      await this.afAuth.sendPasswordResetEmail(email);
      const toast = await this.toastController.create({
        message: 'E-mail de redefinição enviado com sucesso.',
        duration: 3000,
        icon: "checkmark-circle",
        color: "success",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'E-mail não cadastrado',
        duration: 3000,
        icon: "lock-closed",
        color: "primary",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
    }
  }

  // Método para sair do usuário
  async signOut() {
    await this.afAuth.signOut();
  }
}