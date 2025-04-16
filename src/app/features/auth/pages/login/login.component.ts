import { Component } from '@angular/core';
import { FormFieldComponent } from '../../components/formfield/form-field.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submited: boolean = false;
  user_for_test: { email: string; senha: string } = {
    email: 'test@test',
    senha: 'test',
  };

  constructor(private router: Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    if(
      this.form.value.email === this.user_for_test.email &&
      this.form.value.password === this.user_for_test.senha
    ) {
      this.router.navigate(['/dashboard/clinics']);
    }
  
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

}
