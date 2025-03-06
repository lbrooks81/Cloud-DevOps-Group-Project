import {Component, OnInit} from '@angular/core';
import {DatabaseTableComponent} from '../components/database-table/database-table.component';
import {HeaderComponent} from '../components/header/header.component';
import {FooterComponent} from '../components/footer/footer.component';
import {Router} from '@angular/router';
import {getCookie} from '../cookieShtuff';

@Component({
  selector: 'app-database-view',
  imports: [
    DatabaseTableComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './database-view.component.html',
  standalone: true,
  styleUrl: './database-view.component.css'
})
export class DatabaseViewComponent implements OnInit{
  constructor(private router: Router ) {  }

  ngOnInit() {
    document.querySelector('.home-button')!.classList.add('d-none');

    if(!getCookie('employee-id'))
    {
      this.router.navigate(['/login']).then(() => {});
    }
  }
}
