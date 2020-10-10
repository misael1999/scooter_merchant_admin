import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.group = this.builder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendEmail(): void {
    console.log('Sending email...')
  }

  hasInputError(inputName: string, errorCode = 'required'): any {
    return this.group.get(inputName).getError(errorCode);
  }
}
