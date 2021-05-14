import { Patient } from './shared/models/patient.model';
import { Expense } from './shared/models/expense.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpenseType } from './shared/models/expense-type.model';
import { TreatmentType } from './shared/models/treatment-type.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DoctorCityLabel } from './patient/patient-details/shared/doctor-city-label.model';
import { MessagePatient } from '../dentist/shared/message-patient.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class RadiologistService {
  baseUrl = 'https://localhost:5001/';
  gatewayBaseUrl = 'https://localhost:5021/gateway/';

  treatmentTypeChanged = new Subject<TreatmentType>();
  expenseTypeChanged = new Subject<ExpenseType>();
  expenseChanged = new Subject<Expense>();

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  async getAllDoctors() {
    // const docRef = this.afs.collection('users', (ref) =>
    //   ref.where('role', '==', 'dentist')
    // );

    // return docRef;

    //way 1

    // const usersRef = this.afs.collection('users');

    // usersRef
    //   .get()
    //   .forEach((doc) => doc.forEach((user) => console.log(user.data())));

    //way 2
    // let docLabel: DoctorCityLabel[];
    // var users = this.afs
    //   .collection('users', (ref) => ref.where('role', '==', 'dentist'))
    //   .valueChanges();
    // users.pipe(map(data=>data.map((user:any) =>{
    //   let userLabel:DoctorCityLabel = {
    //     label: user.city,
    //     value: user.city,
    //     items: {
    //       label: user.displayName,
    //       value: user.city,
    //     }
    //   }
    // })));

    //WAY 3
    let docLabel: DoctorCityLabel[] = [];

    var usersArr = [];
    let citySet = new Set();
    await this.afs
      .collection('users', (ref) => ref.where('role', '==', 'dentist'))
      .get()
      .forEach((data) => {
        data.docs.forEach((doc: any) => {
          citySet.add(doc.data().city);
          var id = doc.id;
          usersArr.push({ id, ...doc.data() });
        });
      });

    citySet.forEach((city: any) => {
      let userLabel: DoctorCityLabel = {
        label: city,
        value: city,
        items: [],
      };
      usersArr.forEach((user) => {
        console.log(user);
        if (user.city == city) {
          userLabel.items.push({
            label: user.displayName,
            value: user.id,
          });
        }
      });
      docLabel.push(userLabel);
    });
    return docLabel;
  }

  //send treatment to doctor
  async sendToDoctor(id, tretment, patient: Patient) {
    const userDetails = await this.auth.currentUser.then((user) => {
      console.log('user deatals: ', user);
      return user;
    });
    console.log(tretment);

    var message: MessagePatient = {
      senderId: userDetails.uid,
      receiverId: id,
      receiverImage: tretment.treatmentImageUrl,
      imageType: tretment.treatmentName,
      imageUrl: tretment.treatmentImageUrl,
      treatmentId: tretment.treatmentTypeId,
      patientName: patient.firstName + ' ' + patient.lastName,
      patientPhoneNumber: patient.phoneNumber,
      patientGender: patient.gender == 1 ? 'Male' : 'Female',
      patientAge: patient.age,
      seen: false,
      sentAt: new Date(),
      savedInDB: false,
      receiverName: userDetails.displayName,
    };

    this.afs
      .collection('messages')
      .add(message)
      .then((message) => console.log(message));
  }

  //Treatment Type Service
  editTreatmentType(id: number, treatmentType: TreatmentType) {
    this.http
      .put<TreatmentType>(
        this.baseUrl + `api/TreatmentTypes/${id}`,
        treatmentType
      )
      .subscribe((result) => {
        this.treatmentTypeChanged.next(result);
      });
  }
  deleteTreatmentType(id: number) {
    this.http.delete(this.baseUrl + `api/TreatmentTypes/${id}`).subscribe();
  }
  craeteTreatmentType(treatmentType: TreatmentType): void {
    this.http
      .post<TreatmentType>(this.baseUrl + 'api/TreatmentTypes/', treatmentType)
      .subscribe((result) => {
        this.treatmentTypeChanged.next(result);
      });
  }
  getTreatmentTypes(): Promise<TreatmentType[]> {
    return this.http
      .get<TreatmentType[]>(this.baseUrl + 'api/TreatmentTypes/')
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  //Expense Type Service
  editExpenseType(id: number, expenseType: ExpenseType) {
    this.http
      .put<ExpenseType>(this.gatewayBaseUrl + `ExpenseTypes/${id}`, expenseType)
      .subscribe((result) => {
        this.expenseTypeChanged.next(result);
      });
  }
  deleteExpenseType(id: number) {
    console.log(id);

    this.http.delete(this.gatewayBaseUrl + `ExpenseTypes/${id}`).subscribe();
  }
  craeteExpenseType(expenseType: ExpenseType): void {
    this.http
      .post<ExpenseType>(this.gatewayBaseUrl + 'ExpenseTypes', expenseType)
      .subscribe((result) => {
        this.expenseTypeChanged.next(result);
      });
  }
  getExpenseType(): Promise<ExpenseType[]> {
    return this.http
      .get<ExpenseType[]>(this.gatewayBaseUrl + 'ExpenseTypes')
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  //Expense  Service
  editExpense(id: number, expense: Expense) {
    console.log('from service ', expense);
    this.http
      .put<Expense>(this.baseUrl + `api/Expenses/${id}`, expense)
      .subscribe((result) => {
        this.expenseChanged.next(result);
      });
  }
  deleteExpense(id: number) {
    this.http.delete(this.baseUrl + `api/Expenses/${id}`).subscribe();
  }
  craeteExpense(expense: Expense): void {
    console.log(expense);
    this.http
      .post<Expense>(this.baseUrl + 'api/Expenses/', expense)
      .subscribe((result) => {
        this.expenseChanged.next(result);
        console.log('this is result: ', result);
      });
  }
  getExpenses(): Promise<Expense[]> {
    return this.http
      .get<Expense[]>(this.baseUrl + 'api/Expenses/')
      .toPromise()
      .then((data) => {
        console.log('this is data from Expenses:', data);
        return data;
      });
  }
}
