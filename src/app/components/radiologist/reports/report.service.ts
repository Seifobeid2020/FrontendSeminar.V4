import { Report } from './report.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
