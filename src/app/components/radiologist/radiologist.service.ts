import { Expense } from './shared/models/expense.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ExpenseType } from './shared/models/expense-type.model';
import { TreatmentType } from './shared/models/treatment-type.model';

@Injectable({
  providedIn: 'root',
})
export class RadiologistService {
  baseUrl = 'https://localhost:5001/';

  treatmentTypeChanged = new Subject<TreatmentType>();
  expenseTypeChanged = new Subject<ExpenseType>();
  expenseChanged = new Subject<Expense>();

  constructor(private http: HttpClient) {}

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
