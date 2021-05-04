import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  messagesCollection: AngularFirestoreCollection<MessagePatient>;
  messages: MessagePatient[];
  messagesChanges = new BehaviorSubject<MessagePatient[]>([]);
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {
    this.auth.currentUser
      .then((user) => {
        this.user = user;
      })
      .catch((error) => console.log(error));

    this.messagesCollection = afs.collection<MessagePatient>(
      'messages',
      (ref) => ref.where('receiverId', '==', this.user.uid)
    );
    this.messagesCollection
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { messageId: id, ...data };
          })
        )
      )
      .subscribe((data) => {
        this.messages = data;
        this.messagesChanges.next(this.messages.slice());
      });
  }

  createMessage(message: MessagePatient) {
    message.seen = false;
    this.afs.collection('messages').add(message);
  }
}
