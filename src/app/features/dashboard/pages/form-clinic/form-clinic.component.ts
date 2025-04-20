import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormFieldComponent } from '../../../auth/components/formfield/form-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicInterface } from '../../models/clinic.model';
import { FetchClinicsService } from '../../services/fetch-clinics.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './form-clinic.component.html',
  styleUrls: ['./form-clinic.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormFieldComponent,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class FormClinicComponent implements OnInit {
  isLoading = false;
  isEditMode = false;
  regionais: { label: string; value: string }[] = [];
  especialidades: { label: string; value: string }[] = [];
  clinicId: string | null = null;
  clinicData: ClinicInterface | null = null;
  errorMessage: string = 'Erro';
  showErrorModal = false;
  errorStatus = '';

  form = new FormGroup({
    razao_social: new FormControl<string | null>(null, [Validators.required]),
    nome_fantasia: new FormControl<string | null>(null, [Validators.required]),
    cnpj: new FormControl<string | null>(null, [Validators.required]),
    regional: new FormControl<string | null>(null, [Validators.required]),
    data_inauguracao: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    especialidades: new FormControl<string[] | null>([], [Validators.required]),
    ativa: new FormControl<boolean | null>(false),
  });

  constructor(
    private route: ActivatedRoute,
    private serviceApiClinic: FetchClinicsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.clinicId;

    // MOCK: carregamento de regionais e especialidades
    this.regionais = [
      { value: 'Alto tietê', label: 'Alto tietê' },
      { value: 'Interior', label: 'Interior' },
      { value: 'ES', label: 'ES' },
      { value: 'SP Interior', label: 'SP Interior' },
      { value: 'SP', label: 'SP' },
      { value: 'SP2', label: 'SP2' },
      { value: 'MG', label: 'MG' },
      { value: 'Nacional', label: 'Nacional' },
      { value: 'SP CAV', label: 'SP CAV' },
      { value: 'RJ', label: 'RJ' },
      { value: 'SP2', label: 'SP2' },
      { value: 'SP1', label: 'SP1' },
      { value: 'NE1', label: 'NE1' },
      { value: 'NE2', label: 'NE2' },
      { value: 'SUL', label: 'SUL' },
      { value: 'Norte', label: 'Norte' },
    ];

    this.especialidades = [
      { label: 'Cardiologia', value: 'Cardiologia' },
      { label: 'Dermatologia', value: 'Dermatologia' },
      { label: 'Pediatria', value: 'Pediatria' },
      { label: 'Neurologia', value: 'Neurologia' },
      { label: 'Ortopedia', value: 'Ortopedia' },
    ];

    if (this.isEditMode) {
      this.loadClinicData(this.clinicId!);
    }
  }

  loadClinicData(id: string) {
    this.isLoading = true;
    this.serviceApiClinic.getClinicById(Number(id)).subscribe(
      (response) => {
        this.clinicData = response;

        setTimeout(() => {
          this.populateFormWithClinicData(this.clinicData!);
          this.isLoading = false;
        }, 100);
      },
      (error) => {
        console.error('Erro ao buscar clínica:', error);
        this.isLoading = false;
      }
    );
  }

  populateFormWithClinicData(clinic: ClinicInterface) {
    this.form.patchValue({
      razao_social: clinic.razao_social,
      nome_fantasia: clinic.nome_fantasia,
      cnpj: clinic.cnpj,
      regional: clinic.regional,
      data_inauguracao: this.formatDateToInput(clinic.data_inauguracao as Date),
      ativa: clinic.ativa === true,
      especialidades: clinic.especialidades,
    });
  }

  private formatDateToInput(dateString: Date): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
    return this.form.get('data_inauguracao') as FormControl;
  }

  get especialidades_medicasControl(): FormControl {
    return this.form.get('especialidades') as FormControl;
  }

  get ativaControl(): FormControl {
    return this.form.get('ativa') as FormControl;
  }

  returnPage() {
    this.router.navigate(['/dashboard/clinics']);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.showError({errorStatus: 400, message: 'Preencha todos os campos obrigatórios!'});
      return;
    }

    const clinicData: ClinicInterface = {
      id: this.clinicId ? Number(this.clinicId) : 0,
      razao_social: this.form.value.razao_social!,
      nome_fantasia: this.form.value.nome_fantasia!,
      cnpj: this.form.value.cnpj!,
      regional: this.form.value.regional!,
      data_inauguracao: new Date(this.form.value.data_inauguracao!)
        .toISOString()
        .split('T')[0],
      especialidades: this.form.value.especialidades!,
      ativa: this.form.value.ativa!,
    };

    if (this.isEditMode) {
      const response = this.serviceApiClinic.putClinic(clinicData);
      response.subscribe(
        (response) => {
          this.returnPage();
        },
        (error) => {
          this.showError(error);
        }
      );
    } else {
      const response = this.serviceApiClinic.postClinic(clinicData);
      response.subscribe(
        (response) => {
          this.returnPage();
        },
        (error) => {
          this.showError(error);
        }
      );
    }
  }

  showError(error: any) {
    this.errorStatus = error.status || 'Erro';
    this.errorMessage = error.message || 'Algo deu errado';
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
}
