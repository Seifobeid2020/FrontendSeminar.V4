import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
import { MessagePatientService } from './message-patient/message-patient.service';
import firebase from 'firebase';
import { MessagePatient } from './shared/message-patient.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit, OnDestroy {
  sub: Subscription;
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  messages: MessagePatient[];
  // first = true;
  //messages
  messagesArray = [];
  showBox = false;
  numOfNotifictions = 0;

  constructor(
    private auth: AngularFireAuth,
    private messageService: MessagePatientService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async ngOnInit() {
    this.itemsSideNav = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/dentist'],
      },

      {
        label: 'Patients',
        icon: 'pi pi-fw pi-user',
        routerLink: ['/dentist/patients'],
      },
    ];
    this.messagesArray = [];

    // let arr = [];
    await this.auth.onAuthStateChanged((user) => {
      this.sub = this.afs
        .collection('messages', (ref) =>
          ref.where('receiverId', '==', user.uid)
        )
        .snapshotChanges()
        .subscribe((events) => {
          console.log('eventsL: ', events);

          events.forEach((change: any) => {
            if (change.type == 'added') {
              let tempMessage: any = change.payload.doc.data();
              tempMessage.messageId = change.payload.doc.id;
              this.messagesArray = [tempMessage, ...this.messagesArray];
              // console.log('frim added', change.payload.doc.data());
            } else if (change.type == 'modified') {
              // console.log('frim modifier', change.payload.doc.data());
            }
          });

          let keys = ['messageId'],
            filtered = this.messagesArray.filter(
              ((s) => (o) =>
                ((k) => !s.has(k) && s.add(k))(
                  keys.map((k) => o[k]).join('|')
                ))(new Set())
            );
          this.messagesArray = filtered.sort((a, b) => {
            return b.sentAt - a.sentAt;
          });
          let countNumNotifiction = 0;
          this.messagesArray.forEach((m) => {
            if (!m.seen) {
              countNumNotifiction++;
            }
          });
          this.numOfNotifictions = countNumNotifiction;
          // console.log('this is filterd ', this.messagesArray);
          // if (arr.length !== 0) {
          //   arr.sort((a, b) => {
          //     return b.sentAt - a.sentAt;
          //   });
          //   if (this.first) {
          //     this.messagesArray = [...arr];
          //     this.first = false;
          //   } else {
          //     this.messagesArray = [arr[0], ...this.messagesArray];
          //   }
          // }
          // console.log('the array', this.messagesArray);
        });
    });
  }

  logout() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClickedOutside(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;

    if (idAttr != null) {
      if (idAttr.value == 'notifiction') {
        return;
      }
    }

    this.showBox = false;
  }
  onClickNotiction(event) {
    this.showBox = !this.showBox;
  }
  seeAllHide() {
    this.showBox = false;
  }
  onMessagePatientNotifictionClick(message) {
    if (!message.seen) {
      // this.messagesArray.find(e=>e.messageId == message.messageId)
      let objIndex = this.messagesArray.findIndex(
        (m) => m.messageId == message.messageId
      );
      this.messagesArray[objIndex].seen = true;

      this.afs
        .collection('messages')
        .doc(message.messageId)
        .update({ seen: true });
    }

    this.router.navigate(['dentist/patients', message.messageId]);
    this.showBox = false;
  }
}
