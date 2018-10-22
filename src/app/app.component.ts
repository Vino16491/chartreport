import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  fileupload(files: FileList) {
    let file: File = files.item(0);
    let formData = new FormData();

    formData.append("file", file, file.name);
    this.http.post('http://localhost:5000/chartreportx/us-central1/chartreportapi/reportfile', formData)
    .subscribe(data=>{console.log(JSON.stringify(data))}, err=>{console.log(err)});
    console.log(JSON.stringify(file.name));
  }
}
