import { Report } from './report.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvanceReport } from './advance-report/advance-report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  baseUrl = 'https://localhost:5001/';
  constructor(private http: HttpClient) {}

  getReports() {
    return this.http
      .get<Report[]>(this.baseUrl + 'api/report')
      .toPromise()
      .then((data) => {
        console.log(data);
        return data;
      });
  }
  getAdvanceReports() {
    return this.http
      .get<AdvanceReport[]>(this.baseUrl + 'api/report/advanceReport')
      .toPromise()
      .then((data) => {
        console.log(data);
        return data;
      });
  }
}
