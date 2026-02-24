import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DbStatus } from '../../services/api.service';

type Status = 'idle' | 'loading' | 'connected' | 'error';

@Component({
  selector: 'app-db-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './db-status.component.html',
  styleUrl: './db-status.component.scss'
})
export class DbStatusComponent {
  status: Status = 'idle';
  result: DbStatus | null = null;

  pgVersion  = '';
  pgPlatform = '';
  pgCompiler = '';
  timestamp  = '';

  constructor(private api: ApiService) {}

  connect() {
    this.status = 'loading';
    this.api.checkDb().subscribe({
      next: (data) => {
        if (data.error) {
          this.status = 'error';
          this.result = data;
        } else {
          this.status = 'connected';
          const v = data.postgres_version || '';
          this.pgVersion  = v.match(/PostgreSQL ([\d.]+)/)?.[1] || '—';
          this.pgPlatform = v.match(/on ([^,]+)/)?.[1] || '—';
          this.pgCompiler = v.match(/compiled by ([^,]+)/)?.[1] || '—';
          this.timestamp  = new Date().toISOString();
          this.result = data;
        }
      },
      error: (err) => {
        this.status = 'error';
        this.result = { error: err.message };
      }
    });
  }
}
