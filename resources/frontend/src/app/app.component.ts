import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApplicationService } from './services/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public isAuthentication = false;

  constructor(
    private router: Router,
    public applicationService: ApplicationService,
    private httpClient: HttpClient
  ) {
    this.router.events.subscribe((ev) => {
      if(ev instanceof NavigationEnd) {
        this.isAuthentication = this.router.url.indexOf('/register') > -1 || this.router.url.indexOf('/login') > -1;
      }
    });

    if (this.applicationService.isAuthenticated()) {
      this.httpClient.get(`${environment.API}/user/current-user`)
        .subscribe((response: any) => {
          console.log(response);
        }, (error: any) => {
          console.log(error);
        });
    }
  }

  logout() {

    this.applicationService.logout();
    this.router.navigate(['/login']);
  }
}
