import { Routes } from "@angular/router";
import { ClinicsComponent } from "./pages/clinics/clinics.component";
import { FormClinicComponent } from "./pages/form-clinic/form-clinic.component";
import { ViewClinicComponent } from "./pages/view-clinic/view-clinic.component";

export const dashboardRoutes: Routes = [
    {
        path: "clinics",
        component: ClinicsComponent,
    },
    {
        path: "new",
        component: FormClinicComponent
    },
    {
        path: "edit/:id",
        component: FormClinicComponent
    },
    {
        path: "view/:id",
        component: ViewClinicComponent
    }
]