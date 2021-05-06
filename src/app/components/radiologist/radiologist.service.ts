import { Expense } from './shared/models/expense.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpenseType } from './shared/models/expense-type.model';
import { TreatmentType } from './shared/models/treatment-type.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DoctorCityLabel } from './patient/patient-details/shared/doctor-city-label.model';

@Injectable({
  providedIn: 'root',
})
export class RadiologistService {
  baseUrl = 'https://localhost:5001/';

  treatmentTypeChanged = new Subject<TreatmentType>();
  expenseTypeChanged = new Subject<ExpenseType>();
  expenseChanged = new Subject<Expense>();

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

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
      .forEach((data) =>
        data.forEach((user: any) => {
          citySet.add(user.data().city);
          usersArr.push(user.data());
        })
      );
    // console.log(usersArr);
    // console.log(citySet);
    // usersArr.forEach((element) => {
    //   console.log('test', element);
    // });
    citySet.forEach((city: any) => {
      let userLabel: DoctorCityLabel = {
        label: city,
        value: city,
        items: [],
      };
      usersArr.forEach((user) => {
        if (user.city == city) {
          userLabel.items.push({
            label: user.displayName,
            value: user.city,
          });
        }
      });
      docLabel.push(userLabel);
    });
    return docLabel;
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
      .put<ExpenseType>(this.baseUrl + `api/ExpenseTypes/${id}`, expenseType)
      .subscribe((result) => {
        this.expenseTypeChanged.next(result);
      });
  }
  deleteExpenseType(id: number) {
    this.http.delete(this.baseUrl + `api/ExpenseTypes/${id}`).subscribe();
  }
  craeteExpenseType(expenseType: ExpenseType): void {
    this.http
      .post<ExpenseType>(this.baseUrl + 'api/ExpenseTypes/', expenseType)
      .subscribe((result) => {
        this.expenseTypeChanged.next(result);
      });
  }
  getExpenseType(): Promise<ExpenseType[]> {
    return this.http
      .get<ExpenseType[]>(this.baseUrl + 'api/ExpenseTypes/')
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
      });
  }
  getExpenses(): Promise<Expense[]> {
    return this.http
      .get<Expense[]>(this.baseUrl + 'api/Expenses/')
      .toPromise()
      .then((data) => {
        return data;
      });
  }
}
