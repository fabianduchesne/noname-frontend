import { Component } from '@angular/core';
import { DbStatusComponent } from './components/db-status/db-status.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DbStatusComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  today = new Date().toISOString().slice(0, 10);
}

