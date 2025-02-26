import { Component } from '@angular/core';
import {style} from "@angular/animations";

@Component({
  selector: 'app-footer',
  imports: [
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

    protected readonly style = style;
  protected readonly alert = alert;
}
