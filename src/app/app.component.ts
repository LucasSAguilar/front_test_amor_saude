import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from "./shared/components/navigation-menu/navigation-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_clinicas';
}
