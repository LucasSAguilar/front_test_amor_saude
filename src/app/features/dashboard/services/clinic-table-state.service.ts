import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, tap, delay } from 'rxjs/operators';
import { ClinicInterface } from '../models/clinic.model';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { FetchClinicsService } from './fetch-clinics.service';
import { ClinicTableUtilsService } from './clinic-table-utils.service';

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

@Injectable({ providedIn: 'root' })
export class ClinicTableStateService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _clinics$ = new BehaviorSubject<ClinicInterface[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _allClinics: ClinicInterface[] = [];

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(
    private fetchClinics: FetchClinicsService,
    private utils: ClinicTableUtilsService
  ) {
    // Carregar as clínicas
    this.fetchClinics.getAllClinics().subscribe((clinics) => {
      this._allClinics = clinics;
      console.log('clinics carregadas:', this._allClinics);
      
      this._set({ page: 1 });
      this._search$.next();
    });

    

    // Observa o _search$ e executa a busca após um delay (debounce)
    this._search$
      .pipe(
        tap(() => {
          console.log('Busca iniciada. Loading ativado.');
          this._loading$.next(true);
        }),
        debounceTime(300),
        switchMap(() => {
          console.log('Executando busca...');
          return this._search();
        }),
        delay(100),
        tap(() => {
          console.log('Busca concluída. Loading desativado.');
          this._loading$.next(false);
        })
      )
      .subscribe((result) => {
        console.log('Resultado da busca:', result);
        this._clinics$.next(result.clinics);
        this._total$.next(result.total);
      });
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // Verifique se a página é um número válido
    if (isNaN(page) || page < 1) {
      this._set({ page: 1 });
    }

    let clinics = this.utils.sort(this._allClinics, sortColumn, sortDirection);
    clinics = clinics.filter(c => this.utils.matches(c, searchTerm));

    const total = clinics.length;
    clinics = clinics.slice((page - 1) * pageSize, page * pageSize);

    return of({ clinics, total });
  }

  refresh() {
    this.fetchClinics.getAllClinics().subscribe((clinics) => {
      this._allClinics = clinics;
      this._set({ page: 1 });
      this._search$.next();
    });
  }
  

  private _set(patch: Partial<State>) {
    if (patch.page && isNaN(patch.page)) {
      patch.page = 1;
    }
    Object.assign(this._state, patch);
    this._search$.next();
  }

  // Observáveis para acesso aos dados
  get clinics$(): Observable<ClinicInterface[]> {
    return this._clinics$.asObservable();
  }

  get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get page(): number {
    return this._state.page;
  }
  get pageSize(): number {
    return this._state.pageSize;
  }
    
  // Setters para atualizar o estado
  set page(page: number) { 
    if (isNaN(page) || page < 1) {
      console.warn(`Página inválida. Forçando para página 1.`);
      page = 1;
    }
    console.log('Mudando página para:', page);
    this._set({ page });
  }
  set pageSize(size: number) { 
    console.log('Mudando pageSize para:', size);
    this._set({ pageSize: size });
  }
  set searchTerm(term: string) { 
    console.log('Mudando searchTerm para:', term);
    this._set({ searchTerm: term });
  }
  set sortColumn(col: SortColumn) { 
    console.log('Mudando sortColumn para:', col);
    this._set({ sortColumn: col });
  }
  set sortDirection(dir: SortDirection) { 
    console.log('Mudando sortDirection para:', dir);
    this._set({ sortDirection: dir });
  }
}

