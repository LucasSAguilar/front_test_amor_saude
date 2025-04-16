import { Routes } from "@angular/router";
import { ClinicsComponent } from "./pages/clinics/clinics.component";

export const dashboardRoutes: Routes = [
    {
        path: "clinics",
        component: ClinicsComponent,
    }
]