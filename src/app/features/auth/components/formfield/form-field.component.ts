import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formfield',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() errorMessage: string = '';
  @Input() id: string = '';
  @Input() showToggle = false;

  showPassword: boolean = false;

  get currentInputType() {
    if (this.type !== 'password') return this.type;
    return this.showPassword ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
