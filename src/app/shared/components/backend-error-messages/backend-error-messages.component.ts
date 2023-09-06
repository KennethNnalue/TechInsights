import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorsInterface } from '../../models/backendErrors.interface';

@Component({
  selector: 'ti-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input({ required: true }) backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} : ${messages}`;
    });
    console.log(this.errorMessages);
  }
}
