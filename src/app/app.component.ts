import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { NgForm } from "@angular/forms";
import * as csvtojson from "csvtojson";
import {
  HttpHeaders,
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpRequest
} from "@angular/common/http";

export interface Doctor {
  Doctor_ID: string;
  Doctor_Name: string;
  DOB: string;
  Employee_Responsible: string;
  Mobile: string;
  Address: string;
  PinCode: string;
  City: string;
  District: string;
  State: string;
  Country: string;
  Area_of_Specializations?: string;
}

export interface Employee {
  Employee_ID: string;
  Employee_Name: string;
  DOB: string;
  Mobile: string;
  Address: string;
  PinCode: string;
  City: string;
  District: string;
  State: string;
  Country: string;
  DOJ: string;
  Designation: string;
  Manager: string;
  PAN: string;
  Adhaar: string;
}

export interface Product {
  Product_ID: string;
  Product_Name: string;
  Product_Category: string;
  Unit_Of_Measure: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  /* For Doctor Date */
  doctorDisplayedColumns = [
    "Doctor_ID",
    "Doctor_Name",
    "DOB",
    "Employee_Responsible",
    "Mobile",
    "Address",
    "PinCode",
    "City",
    "District",
    "State",
    "Country",
    "Area_of_Specializations"
  ];

  doctorDataSource = new MatTableDataSource<Doctor>();

  /* For Employee Data */
  employeeDisplayColumns = [
    "Employee_ID",
    "Employee_Name",
    "DOB",
    "Mobile",
    "Address",
    "PinCode",
    "City",
    "District",
    "State",
    "Country",
    "DOJ",
    "Designation",
    "Manager",
    "PAN",
    "Adhaar"
  ];

  employeeDataSource = new MatTableDataSource<Employee>();

  /* For product Data */
  productDisplayColumns = [
    "Product_ID",
    "Product_Name",
    "Product_Category",
    "Unit_Of_Measure"
  ];
  productDataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private http: HttpClient) {}
  ngOnInit() {}

  ngAfterViewInit() {
    /* for doctor */
    this.doctorDataSource.sort = this.sort;
    this.doctorDataSource.paginator = this.paginator;

    /* for employee */
    this.employeeDataSource.sort = this.sort;
    this.employeeDataSource.paginator = this.paginator;

    /* for product */
    this.productDataSource.sort = this.sort;
    this.productDataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.doctorDataSource.filter = filterValue.trim().toLowerCase();
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
    this.productDataSource.filter = filterValue.trim().toLowerCase();
  }

  filepost(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      // console.log(fileReader.result)
      fileReader.onload = ev => {
        let csvdata = fileReader.result.toString();
        return csvtojson()
          .fromString(csvdata)
          .then(json => {
            console.log(file.name);

            this.doctorDataSource.data = json;
          });
      };
    }
  }

  employeefilepost(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      // console.log(fileReader.result)
      fileReader.onload = ev => {
        let csvdata = fileReader.result.toString();
        return csvtojson()
          .fromString(csvdata)
          .then(json => {
            console.log(file.name);

            this.employeeDataSource.data = json;
          });
      };
    }
  }

  productfilepost(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      // console.log(fileReader.result)
      fileReader.onload = ev => {
        let csvdata = fileReader.result.toString();
        return csvtojson()
          .fromString(csvdata)
          .then(json => {
            console.log(file.name);

            this.productDataSource.data = json;
          });
      };
    }
  }
}
