import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  @Input() bookingDetails: any;
  @Output() bookEmitter = new EventEmitter();
  public form = new FormGroup({
    requested_address: new FormControl(null, Validators.required),
    requested_pincode: new FormControl(null, Validators.required),
    repair_for: new FormControl(null, Validators.required)
  });

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
  }

  submit() {
    const data = this.form.value;
    data.garage_id = this.bookingDetails.id;
    this.httpClient.post(
      `${environment.API}/requests`,
      data
    ).subscribe((response: any) => {
      console.log(response);
      this.bookEmitter.emit(null);
    }, (error: any) => {
      console.error(error);
    });
  }
}
