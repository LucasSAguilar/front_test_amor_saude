import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment.prod';
import { Observable } from 'rxjs';
import { ClinicInterface } from '../models/clinic.model';

@Injectable({
  providedIn: 'root',
})
export class FetchClinicsService {
  constructor(private http: HttpClient) {}

  getAllClinics(): Observable<ClinicInterface[]> {
    return this.http.get<ClinicInterface[]>(`${environment.API_URL}/clinicas`);
  }
  getClinicById(id:number): Observable<ClinicInterface> {
    return this.http.get<ClinicInterface>(`${environment.API_URL}/clinicas/${id}`);
  }

  postClinic(clinic: ClinicInterface): Observable<ClinicInterface> {
    return this.http.post<ClinicInterface>(`${environment.API_URL}/clinicas`, clinic);
  }

  putClinic(clinic: ClinicInterface): Observable<ClinicInterface> {
    return this.http.put<ClinicInterface>(`${environment.API_URL}/clinicas/${clinic.id}`, clinic);
  }
}
