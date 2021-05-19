import { Subject, Subscription } from 'rxjs';
import { MessagePatientService } from 'src/app/components/dentist/message-patient/message-patient.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
import { PatientDashboard } from '../../radiologist/shared/models/patient-dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  // userId;
  sub: Subscription;
  topFiveRad: PatientDashboard[] = [];
  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  async ngOnInit() {}

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
