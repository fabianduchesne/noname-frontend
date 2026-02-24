import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, ContactResponse } from '../../services/api.service';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  name    = '';
  email   = '';
  comment = '';
  maxLen  = 1000;

  status: SubmitStatus = 'idle';
  result: ContactResponse | null = null;
  validationError = '';

  constructor(private api: ApiService) {}

  get charCount() { return this.comment.length; }

  submit() {
    this.validationError = '';

    if (!this.name.trim() || !this.email.trim() || !this.comment.trim()) {
      this.validationError = 'All fields are required.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.validationError = 'Invalid email address.';
      return;
    }

    this.status = 'loading';
    this.api.submitContact({ name: this.name, email: this.email, comment: this.comment }).subscribe({
      next: (data) => {
        if (data.error) {
          this.status = 'error';
          this.result = data;
        } else {
          this.status = 'success';
          this.result = data;
          this.name = this.email = this.comment = '';
        }
      },
      error: (err) => {
        this.status = 'error';
        this.result = { error: err.message };
      }
    });
  }
}

