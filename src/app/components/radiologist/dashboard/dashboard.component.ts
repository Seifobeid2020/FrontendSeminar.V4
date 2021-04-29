import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
interface Product {
  code;
  name;
  category;
  quantity;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [
    {
      code: 's',
      name: 'd',
      category: 'a',
      quantity: 'sa',
    },
  ];
  data: any;

  constructor() {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  ngOnInit(): void {}
}
