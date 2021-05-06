import { DoctorCityLabel } from './../../radiologist/patient/patient-details/shared/doctor-city-label.model';
import { AuthService } from './../../auth.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { MessagePatient } from '../shared/message-patient.model';

@Injectable()
export class MessagePatientService implements OnInit {
  userData;
  user: firebase.User;
  messagesCollection: AngularFirestoreCollection<MessagePatient>;
  messages: MessagePatient[];
  messagesChanges = new BehaviorSubject<MessagePatient[]>([]);
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    // this.auth.currentUser
    //   .then((user) => {
    //     this.user = user;
    //   })
    //   .catch((error) => console.log(error));
    this.auth.authState.subscribe((user) => {
      this.innet(user.uid);
    });
  }
  ngOnInit(): void {}

  innet(userID) {
    this.messagesCollection = this.afs.collection<MessagePatient>(
      'messages',
      (ref) => ref.where('receiverId', '==', userID)
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
