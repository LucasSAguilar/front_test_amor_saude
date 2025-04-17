import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ClinicInterface } from '../models/clinic.model';
import { clinicsMock } from '../mocks/clinics-mocks';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';

interface SearchResult {
    clinics: ClinicInterface[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

function compare(a: any, b: any): number {
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime();
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return Number(a) - Number(b);
    }
    return 0;
}


function sort(clinics: ClinicInterface[], column: SortColumn, direction: string): ClinicInterface[] {
    if (direction === '' || column === '') {
        return clinics;
    } else {
        return [...clinics].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(clinic: ClinicInterface, term: string, pipe: PipeTransform): boolean {
    return (
        clinic.razao_social.toLowerCase().includes(term.toLowerCase()) ||
        clinic.regional.toLowerCase().includes(term.toLowerCase()) ||
        clinic.especialidades_medicas.some(e =>
            e.toLowerCase().includes(term.toLowerCase())
        )
    );
}


@Injectable({ providedIn: 'root' })
export class ClinicService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _clinics$ = new BehaviorSubject<ClinicInterface[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
    };

    constructor(private pipe: DecimalPipe) {
        this._search$
            .pipe(
                tap(() => this._loading$.next(true)),
                debounceTime(600),
                switchMap(() => this._search()),
                delay(200),
                tap(() => this._loading$.next(false)),
            )
            .subscribe((result) => {
                this._clinics$.next(result.clinics);
                this._total$.next(result.total);
            });

        this._search$.next();
    }

    get clinics$() {
        return this._clinics$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    get pageSize() {
        return this._state.pageSize;
    }
    get searchTerm() {
        return this._state.searchTerm;
    }

    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: SortColumn) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let clinics = sort(clinicsMock, sortColumn, sortDirection);

        // 2. filter
        clinics = clinics.filter((clinic) => matches(clinic, searchTerm, this.pipe));
        const total = clinics.length;

        // 3. paginate
        clinics = clinics.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ clinics, total });
    }
}