import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {RecordFormComponent} from '../components/record-form/record-form.component';
import {getCookie} from '../cookieShtuff';
import {Router} from '@angular/router';


@Component({
  selector: 'app-individual-record-view',
  imports: [
    HeaderComponent,
    FooterComponent,
    RecordFormComponent
  ],
  templateUrl: './individual-record-view.component.html',
  standalone: true,
  styleUrl: './individual-record-view.component.css'
})
export class IndividualRecordViewComponent implements OnInit{

  // YOU WILL NOT BE ABLE TO ACCESS THIS PAGE WITHOUT SELECTING A ROW FROM THE DATABASE.

  public id: string = '';
  public table: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    // This ensures they have logged in
    if(!getCookie('employee-id'))
    {
      this.router.navigate(['/']);
    }
    // This makes sure they have chosen a row from the database to view.
    if(!getCookie('record-id') || !getCookie('table-name'))
    {
      this.router.navigate(['/database']);
    }

    // This is the record they clicked on's ID
    this.id = getCookie('record-id');

    // This is the table they clicked on
    this.table = getCookie('table-name');

    console.log(`GET API FROM URL/${this.table.toLowerCase()}/id=${this.id}`);
  }
}
