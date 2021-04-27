import { Report } from './report.model';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { ReportService } from './report.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports: Report[];

  statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  totalAmount: number = 0;

  @ViewChild('reportTable', { static: true }) reportTable;

  constructor(
    private reportService: ReportService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.reportService.getReports().then((reports) => {
      this.reports = reports;
      this.loading = false;

      this.reports.forEach((report) => {
        this.totalAmount += report.balance;
        report.date = new Date(report.date);
      });
    });
  }

  balanceStyle(balance) {
    return balance < 0 ? true : false;
  }
  changeTotalBalance() {
    if (this.reportTable.filteredValue) {
      this.totalAmount = 0;
      this.reportTable.filteredValue.forEach((report) => {
        this.totalAmount += report.balance;
      });
    }
  }
}
