import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { MessagePatient } from '../shared/message-patient.model';

@Injectable({
  providedIn: 'root',
})
export class MessagePatientService {
  user: firebase.User;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.currentUser
      .then((user) => {
        this.user = user;
      })
      .catch((error) => console.log(error));
  }

  getUserMessages(): AngularFirestoreCollection {
    return this.db.collection('messages', (ref) =>
      ref.where('to', '==', this.user.uid)
    );
  }

  createMessage(message: MessagePatient) {
    this.db.collection('messages').add(message);
  }
}
