import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getCookie} from '../../cookieShtuff';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {disableDebugTools} from '@angular/platform-browser';

@Component({
  selector: 'app-record-form',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './record-form.component.html',
  standalone: true,
  styleUrl: './record-form.component.css'
})
export class RecordFormComponent implements OnInit{
  errorMessage: any;
  record: any;


  public id: string = '';
  public table: string = '';
  public recordKeys: any[] = [];

  constructor(private router: Router, private http: HttpClient) {
  }

  //Get cookie ('record') and turn into object
  ngOnInit() {
    if (!getCookie('employee-id')) {
      this.router.navigate(['/']);
    }
    // This makes sure they have chosen a row from the database to view.
    if (!getCookie('record') || !getCookie('table-name')) {
      this.router.navigate(['/database']);
    }

    // This is the record they clicked on's ID

    // This is the table they clicked on
    this.table = getCookie('table-name');
    this.record = JSON.parse(getCookie('record'));
    console.log("TABBBLLLLLLEEEEE NAMMMMMMMEEEEE: ", this.table);
    console.log("Record Clicked: ", this.record);
    this.getRecordKeys();
  }

  getRecordKeys() {
    this.recordKeys = Object.keys(this.record);
    console.log(this.recordKeys);
  }

  submitFakeForm(event: KeyboardEvent) {
    console.log(event.key)
    console.log(event.target)
    // event.target.id is the attribute name
    // record[event.target.id] is the value
    try {
      console.log((event.target as HTMLElement).id);
      console.log(this.record[(event.target as HTMLElement).id]);

      this.record[(event.target as HTMLElement).id] = (event.target as HTMLInputElement).value;
    }
    catch (e) {
      console.log("Error: ", e);
    }


  }

  async putRecord(event: MouseEvent) {
    try {
      const response = await this.http.put(`https://localhost:3000/${this.table}/${this.record[Object.keys(this.record)[0]]}`, this.record).toPromise();
      console.log(response);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }

  deleteRecord(event: MouseEvent) {
    console.log("Delete Record");
    console.log(this.record);
    console.log(this.record[Object.keys(this.record)[0]]);
    console.log("DELETE REQUEST", `https://localhost:3000/${this.table}/${this.record[Object.keys(this.record)[0]]}`);
    this.http.delete(`https://localhost:3000/${this.table}/${this.record[Object.keys(this.record)[0]]}`).subscribe({
      next: (data) => {
        console.log(data);
/*
        this.router.navigate(['/database']);
*/
      },
      error: (error) => {
        console.error("Error deleting record:", error);


        // TODO IF YOU CAN DATABASE ERROR OCCURS HERE. - KACI 3/6/2025 12:45 am
      }
    });
  }

  postRecord(event: MouseEvent) {
    console.log("Post Record");
    console.log(this.record);
    console.log("POST REQUEST", `https://localhost:3000/${this.table}`);
    this.http.post(`https://localhost:3000/${this.table}`, this.record).subscribe({
      next: (data) => {
        console.log(data);
      }
    });
  }



  /*async saveRecord(event: MouseEvent) {
    console.log("Overwrite Record");

    console.log(this.record);
    console.log(this.record[Object.keys(this.record)[0]]);
    console.log("PUT REQUEST", `https://localhost:3000/${this.table}/${this.record[Object.keys(this.record)[0]]}`);
    console.log("REQUEST BODY", this.record);
    let response = await this.http.put(`https://localhost:3000/${this.table}/${this.record[Object.keys(this.record)[0]]}`, this.record);
    console.log(response);
  }*/

  protected readonly disableDebugTools = disableDebugTools;
}

