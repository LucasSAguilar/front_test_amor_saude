import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ClinicService } from '../../services/clinic-table.service';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';
import { ClinicInterface } from '../../models/clinic.model';

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [DecimalPipe, FormsModule, AsyncPipe, NgbHighlight, NgbdSortableHeader, NgbPaginationModule, NgIf, NgFor],
  templateUrl: './clinics.component.html',
  providers: [ClinicService, DecimalPipe],
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent {
  clinics$: Observable<ClinicInterface[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	constructor(public service: ClinicService) {
		this.clinics$ = service.clinics$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
}
