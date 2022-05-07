import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplicationService } from 'src/app/services/application.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-find-mechanic',
  templateUrl: './find-mechanic.component.html',
  styleUrls: ['./find-mechanic.component.scss']
})
export class FindMechanicComponent implements OnInit {

  public garages: any[] = [];
  public imageUrl = environment.API.replace('/public/api', '');
  modalRef?: BsModalRef;
  public deleteGarage: any;
  constructor(
    private router: Router,
    public applicationService: ApplicationService,
    private httpClient: HttpClient,
    public modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.getGarages();
  }

  getGarages() {
    this.httpClient.get(
      `${environment.API}/garages`
    ).subscribe((response: any) => {
      console.log(response);
      this.garages = response;
      if (this.garages?.length) {
        this.garages?.forEach(item => {
          item.experience_in = item?.experience_in?.split(',');
        });
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  openDeleteModal(template: any, item: any) {
    this.deleteGarage = item;
    this.modalRef = this.modalService.show(template);
  }

  confirmDelete() {
    this.httpClient.post(
      `${environment.API}/garages/delete/${this.deleteGarage.id}`,
      this.deleteGarage
    ).subscribe((response: any) => {
      console.log(response);
      this.modalRef?.hide();
      this.getGarages();
    }, (error: any) => {
      console.error(error);
    });
  }
}
