import { Subject, Subscription } from 'rxjs';
import { MessagePatientService } from 'src/app/components/dentist/message-patient/message-patient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
import { PatientDashboard } from '../../radiologist/shared/models/patient-dashboard.model';

interface radiologistViewModel {
  name;
  phoneNumber;
  totalPatients;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // userId;
  sub: Subscription;
  topFiveRad: radiologistViewModel[] = [];
  totalPatients;
  totalRadiologists;
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngOnInit() {
    this.images = [
      {
        previewImageSrc: '/assets/images/Ad1.png',
        thumbnailImageSrc: '/assets/images/Ad1.png',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },

      {
        previewImageSrc: '/assets/images/Ad3.png',
        thumbnailImageSrc: '/assets/images/Ad3.png',
        alt: 'Description for Image 3',
        title: 'Title 1',
      },
    ];
  }

  images: any[];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
}
