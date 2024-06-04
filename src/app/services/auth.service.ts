import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastController: ToastController, private firestore: AngularFirestore) { }

  // Método para criar um novo usuário
  async register(displayName: string, email: string, password: string) {
    try {
      // Criação do usuário com e-mail e senha
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      
      // Extrai o usuário do resultado
      const user = userCredential.user;

      // Verifica se o usuário está autenticado
      if (user) {
        // Salva as informações adicionais no Firestore
        await this.firestore.collection('users').doc(user.uid).set({
          displayName: displayName,
          email: email,
        });
      }

      // Toast de sucesso
      const toast = await this.toastController.create({
        message: 'Conta criada com sucesso.',
        duration: 3000,
        icon: "checkmark-circle",
        color: "success",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
      this.router.navigate(['login']);
      // Retorna o resultado da criação do usuário
      return userCredential;
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Insira os dados corretamente',
        duration: 3000,
        icon: "lock-closed",
        color: "primary",
        keyboardClose: true,
        position: "bottom",
      });
      await toast.present();
      throw error;
    }
  }

  // Método para fazer login de um usuário
  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['tabs']);
    } catch (error) {
      console.error('Erro:', error);
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
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const user = result.user;
  
      if (user) {
        // Aqui você pode acessar as informações do usuário
        const displayName = user.displayName;
        const email = user.email;
        const uid = user.uid;
  
        // Salvar informações adicionais no Firestore
        await this.firestore.collection('users').doc(uid).set({
          displayName: displayName,
          email: email,
        }, { merge: true });
  
        // Navegar para a página principal
        this.router.navigate(['tabs']);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
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