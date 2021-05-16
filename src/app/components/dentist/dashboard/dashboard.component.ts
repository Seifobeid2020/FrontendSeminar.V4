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
  // userId;
  sub: Subscription;

  showFlag: boolean = false;
  selectedImageIndex: number = -1;

  currentIndex: any = -1;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  async ngOnInit() {}

  imageObject: Array<any> = [
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/drradauthpay.appspot.com/o/uploads%2F7%2F2763.jpg?alt=media&token=77519235-3540-42b1-93a2-5a30167799aa',
      thumbImage:
        'https://firebasestorage.googleapis.com/v0/b/drradauthpay.appspot.com/o/uploads%2F7%2F2763.jpg?alt=media&token=77519235-3540-42b1-93a2-5a30167799aa',
      title: 'Hummingbirds are amazing creatures',
    },
  ];

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
