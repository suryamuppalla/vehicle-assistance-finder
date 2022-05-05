import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-find-mechanic',
  templateUrl: './find-mechanic.component.html',
  styleUrls: ['./find-mechanic.component.scss']
})
export class FindMechanicComponent implements OnInit {

  constructor(
    private router: Router,
    public applicationService: ApplicationService
  ) {
  }

  ngOnInit(): void {
  }

}
