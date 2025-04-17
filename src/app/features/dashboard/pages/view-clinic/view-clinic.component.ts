import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-clinic',
  standalone: true,
  imports: [],
  templateUrl: './view-clinic.component.html',
  styleUrl: './view-clinic.component.css'
})
export class ViewClinicComponent implements OnInit {

  clinicId: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.clinicId = this.route.snapshot.paramMap.get('id');
  }
  returnPage() {
    window.history.back();
  }

  editThisClinic(){
    this.router.navigate(['/dashboard/edit', this.clinicId]);
  }
}
