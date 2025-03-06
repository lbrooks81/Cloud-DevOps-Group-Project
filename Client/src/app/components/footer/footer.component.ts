import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from '../../services/email.service.service';
import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  protected readonly alert = alert;
  constructor(private snackBar: MatSnackBar, private emailService: EmailService) {}
}
