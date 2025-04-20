import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicInterface } from '../../models/clinic.model';
import { FetchClinicsService } from '../../services/fetch-clinics.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-clinic',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './view-clinic.component.html',
  styleUrl: './view-clinic.component.css'
})
export class ViewClinicComponent implements OnInit {

  clinicData: ClinicInterface | null = null;
  clinicId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private fetchClinicService: FetchClinicsService) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
    if (this.clinicId) {
      this.fetchClinicService.getClinicById(+this.clinicId).subscribe((data: ClinicInterface) => {
        this.clinicData = data;
        console.log(data);
        
      });
    }
  }

  returnPage() {
    window.history.back();
  }

  editThisClinic(){
    this.router.navigate(['/dashboard/edit', this.clinicId]);
  }
}
