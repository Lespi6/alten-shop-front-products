import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'app/domain/product';
import { ProductService } from 'app/service/product.service';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewChecked {

  products: Product[] = [];
  layout: string = "grid";
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string = 'name';
  sortOrder: number = 1;
  currentPageReportTemplate: string = "Loading...";


  constructor(private productService: ProductService, private cdRef:ChangeDetectorRef) { }
  @ViewChild('dv') dataView: DataView | undefined;

  ngOnInit(): void {
    this.productService.products$.subscribe(data => { this.products = data; });
    this.sortOptions = [
      {label: 'Name', value: 'name'},
      {label: 'Category', value: 'category'},
      {label: 'Rating', value: 'rating'},
      {label: 'Price', value: 'price'},
    ];
  }

  ngAfterViewChecked(): void {
    this.currentPageReportTemplate = this.getCurrentPageReport();
    this.cdRef.detectChanges();
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  reverseSorting() {
    this.sortOrder = -this.sortOrder
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
        case "INSTOCK":
          return 'success';
        case "LOWSTOCK":
          return 'warning';
        case "OUTOFSTOCK":
          return 'danger';
        default:
            return null;
    }
  }

  getCurrentPageReport() {
    if (!this.dataView) { return "Loading..."; }

    const first = this.dataView.first ?? -1;
    const rows = this.dataView.rows ?? -1;
    const totalRecords = this.dataView.totalRecords ?? 0;
  
    if (rows === -1 || first === -1) { return "No data available"; }
  
    const start = first + 1;
    const end = Math.min(start * rows, totalRecords);
  
    return `Showing ${start} to ${end} of ${totalRecords} entries`;
  }

  applyFilter($event, stringVal) {
    this.dataView?.filter(($event.target as HTMLInputElement).value, stringVal);
  }
}
