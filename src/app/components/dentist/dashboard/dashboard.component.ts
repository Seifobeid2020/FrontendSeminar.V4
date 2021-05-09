import { Subject, Subscription } from 'rxjs';
import { MessagePatientService } from 'src/app/components/dentist/message-patient/message-patient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  messagesArray = [];
  // userId;
  sub: Subscription;
  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private messagePatientService: MessagePatientService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  async ngOnInit() {
    this.test();

    // this.userId = await this.messagePatientService.getUID();
    this.messagesArray = [];
    await this.auth.onAuthStateChanged((user) => {
      this.sub = this.afs
        .collection('messages', (ref) =>
          ref.where('receiverId', '==', user.uid)
        )
        .snapshotChanges()
        .subscribe((events) => {
          events.forEach((change: any) => {
            if (change.type == 'added') {
              // console.log(change.payload.doc.data());
              let tempMessage: any = change.payload.doc.data();
              // let timeNow: any = new Date();
              // console.log(timeNow);
              // console.log(tempMessage.sentAt.toDate());
              // tempMessage.sentAt = timeNow - tempMessage.sentAt.toDate();
              // tempMessage.sentAt = Math.floor(
              //   (tempMessage.sentAt % 86400000) / 3600000
              // );
              // console.log('after', tempMessage.sentAt);
              // console.log();
              this.messagesArray.push(tempMessage);
            } else if (change.type == 'modified') {
            }
          });
        });
    });

    console.log(this.messagesArray);

    //console.log(this.messagesArray);
    // .subscribe((events) => {
    //   events.forEach((change) => {
    //     if (change.type == 'added') {
    //       // console.log(change.payload.doc.data());
    //       arr.push(change.payload.doc.data());
    //       console.log(change.payload.doc.data());
    //     }
    //   });
    // });
    // this.messagesArray.push(this.messagePatientService.getMesseges());
    // console.log('this is messsages array : ', this.messagesArray);
  }

  showBox = false;

  onClickedOutside(event) {
    // if (this.showBox && this.isOutSide) {

    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;

    // var value = idAttr.nodeValue;
    if (idAttr != null) {
      console.log(idAttr);
      if (idAttr.value == 'notifiction') {
        return;
      }
    }

    this.showBox = false;

    // this.isOutSide = true;

    // console.log(this.showBox, ' === ', !this.isOutSide);
  }
  onClickNotiction() {
    this.showBox = !this.showBox;
  }

  test() {
    var arr1 = [
      { wow: 1, sss: 1 },
      { wow: 2, sss: 2 },
      { wow: 3, sss: 3 },
    ];
    var arr2 = [
      { lol: 1, php: 1 },
      { lol: 2, php: 2 },
      { lol: 3, php: 3 },
    ];

    var arr3 = [...arr1];
    arr3 = [...arr1, ...arr3];
    console.log('this is arr3 :', arr3);
  }
}
