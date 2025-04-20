import { Component, QueryList, ViewChildren } from '@angular/core';
import { ClinicTableStateService } from '../../services/clinic-table-state.service';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../directives/sortable.directive';
import { ClinicInterface } from '../../models/clinic.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DecimalPipe, AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './clinics.component.html',
  providers: [DecimalPipe],
  styleUrl: './clinics.component.css',
})
export class ClinicsComponent {
  clinics$: Observable<ClinicInterface[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: ClinicTableStateService, private router: Router) {
    this.clinics$ = service.clinics$;
	console.log('clinics$', this.clinics$);
	
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  navigateNewClinic() {
    this.router.navigate(['/dashboard/new']);
  }

  navigateEditClinic(id: number) {
    this.router.navigate(['/dashboard/edit', id]);
  }

  navigateViewClinic(id: number) {
    this.router.navigate(['/dashboard/view', id]);
  }

  
}
