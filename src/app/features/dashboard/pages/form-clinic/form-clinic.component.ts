import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FormFieldComponent } from '../../../auth/components/formfield/form-field.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './form-clinic.component.html',
  styleUrls: ['./form-clinic.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, FormFieldComponent],
})
export class FormClinicComponent implements OnInit {
  isLoading = false;
  isEditMode = false;
  isSubmitting = false;
  regionais: { label: string; value: string }[] = [];
  especialidades: { label: string; value: string }[] = [];
  clinicId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.clinicId;

    if (this.isEditMode) {
      // Carregar os dados da clínica com o id
      this.loadClinicData(this.clinicId!);
    }
  }

  loadClinicData(id: string) {
    // Chamada ao serviço que busca a clínica e preenche o formulário
  }

  form = new FormGroup({
    razao_social: new FormControl('', [Validators.required]),
    nome_fantasia: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    regional: new FormControl('', [Validators.required]),
    data_inauguração: new FormControl('', [Validators.required]),
    especialidades_medicas: new FormControl('', [Validators.required]),
    ativa: new FormControl(''),
  });

  get razao_socialControl(): FormControl {
    return this.form.get('razao_social') as FormControl;
  }
  get nome_fantasiaControl(): FormControl {
    return this.form.get('nome_fantasia') as FormControl;
  }
  get cnpjControl(): FormControl {
    return this.form.get('cnpj') as FormControl;
  }
  get regionalControl(): FormControl {
    return this.form.get('regional') as FormControl;
  }
  get data_inauguracaoControl(): FormControl {
    return this.form.get('data_inauguração') as FormControl;
  }
  get especialidades_medicasControl(): FormControl {
    return this.form.get('especialidades_medicas') as FormControl;
  }
  get ativaControl(): FormControl {
    return this.form.get('ativa') as FormControl;
  }


  returnPage() {
    window.history.back();
  }

}
