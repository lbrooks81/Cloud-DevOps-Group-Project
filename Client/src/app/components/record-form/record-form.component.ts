import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getCookie} from '../../cookieShtuff';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-record-form',
  imports: [
    NgForOf
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

  constructor(private router: Router) {
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
    console.log("Record Clicked: ", this.record);
    this.getRecordKeys();
  }

  getRecordKeys() {
    this.recordKeys = Object.keys(this.record);
    console.log(this.recordKeys);
  }

}

