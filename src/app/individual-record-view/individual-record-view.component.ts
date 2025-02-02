import { Component } from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';

@Component({
  selector: 'app-individual-record-view',
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './individual-record-view.component.html',
  standalone: true,
  styleUrl: './individual-record-view.component.css'
})
export class IndividualRecordViewComponent {

}
