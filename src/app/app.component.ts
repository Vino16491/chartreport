import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as csvtojson from 'csvtojson';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  customdata;
  productsdata;
  employeedata;
  doctordata;
  constructor(private http: HttpClient) {}

  fileupload(event) {
    let file: File = event.target.files[0]
    let fileReader : FileReader = new FileReader();
    fileReader.readAsText(file)
    // console.log(fileReader.result)
    fileReader.onload = (ev)=>{
      let csvdata = fileReader.result.toString()
      return csvtojson().fromString(csvdata).then(json=>{

        console.log(JSON.stringify(json))
      
    })}
    
  }
}
