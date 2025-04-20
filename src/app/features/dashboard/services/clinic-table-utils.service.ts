import { Injectable, PipeTransform } from '@angular/core';
import { ClinicInterface } from '../models/clinic.model';
import { SortColumn, SortDirection } from '../directives/sortable.directive';

@Injectable({ providedIn: 'root' })
export class ClinicTableUtilsService {
  compare(a: any, b: any): number {
    if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b);
    return 0;
  }

  sort(clinics: ClinicInterface[], column: SortColumn, direction: SortDirection): ClinicInterface[] {
    if (!direction || !column) return clinics;
    return [...clinics].sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }

  matches(clinic: ClinicInterface, term: string): boolean {
    return (
      clinic.razao_social?.toLowerCase().includes(term.toLowerCase()) ||
      clinic.regional?.toLowerCase().includes(term.toLowerCase()) ||
      clinic.especialidades?.some(e => e.toLowerCase().includes(term.toLowerCase()))
    );
  }
  
}
