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
import { apiUserService } from '../../services/api-users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormFieldComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submited: boolean = false;
  messageError: string = '';
  user_for_test: { email: string; senha: string } = {
    email: 'test@test',
    senha: 'test',
  };

  constructor(private router: Router, private authService: apiUserService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.submited = true;
  
    if (this.form.invalid) {
      this.messageError = 'Preencha todos os campos corretamente!';
      return;
    };
  
    this.authService.login(this.form.value as any).subscribe({
      next: (res) => {
        console.log('Login ok', res);
        this.router.navigate(['/dashboard/clinics']);
      },
      error: (err) => {
        this.messageError = err.error.message;
      }
    });
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

}
