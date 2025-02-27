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

  constructor(private router: Router) {}
  ngOnInit() {
    if(!getCookie('employee-id'))
    {
      this.router.navigate(['/']);
    }
  }
}
