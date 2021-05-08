import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuItem } from 'primeng/api';
import { MessagePatientService } from './message-patient/message-patient.service';
import firebase from 'firebase';
import { MessagePatient } from './shared/message-patient.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.component.html',
  styleUrls: ['./dentist.component.css'],
})
export class DentistComponent implements OnInit, OnDestroy {
  // user: firebase.User;
  sub: Subscription;
  itemsNav: MenuItem[];
  itemsSideNav: MenuItem[];
  messages: MessagePatient[];

  //messages
  messagesArray = [];
  showBox = false;

  constructor(
    private auth: AngularFireAuth,
    private messageService: MessagePatientService,
    private afs: AngularFirestore
  ) {}

  async ngOnInit() {
    // this.auth.currentUser
    //   .then((user) => {
    //     this.user = user;
    //   })
    //   .catch((err) => console.log(err));

    // this.sub = this.messageService.messagesChanges.subscribe((data) => {
    //   this.messages = data;
    // });

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
    await this.auth.onAuthStateChanged((user) => {
      this.sub = this.afs
        .collection('messages', (ref) =>
          ref.where('receiverId', '==', user.uid).limit(1)
        )
        .snapshotChanges()
        .subscribe((events) => {
          events.forEach((change: any) => {
            if (change.type == 'added') {
              let tempMessage: any = change.payload.doc.data();
              tempMessage.uid = change.payload.doc.id;
              console.log(tempMessage);
              this.messagesArray.push(tempMessage);
            } else if (change.type == 'modified') {
            }
          });
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
      console.log(idAttr);
      if (idAttr.value == 'notifiction') {
        return;
      }
    }

    this.showBox = false;
  }
  onClickNotiction(event) {
    this.showBox = !this.showBox;
    console.log(event);
  }
  seeAllHide() {
    this.showBox = false;
  }
}
