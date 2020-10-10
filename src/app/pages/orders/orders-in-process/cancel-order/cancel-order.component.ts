import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  orderId: number;
}

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})

export class CancelOrderComponent implements OnInit {

  rejectForm: FormGroup;
  orderId: number;
  loadingSave: boolean;

  constructor(public dialogRef: MatDialogRef<CancelOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private orderService: OrdersService, private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
    this.orderId = data.orderId;
  }

  ngOnInit(): void {
    this.buildRejectForm();
  }

  rejectOrder() {
    if (this.rejectForm.invalid) {
      this.rejectForm.markAllAsTouched();
      return true;
    }
    this.orderService.cancelOrder(this.orderId, this.rejectForm.value)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showMessageSuccess('Pedido cancelado correctamente');
        this.dialogRef.close(true);
      }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSave = false;
      });
  }

  buildRejectForm() {
    this.rejectForm = this.formBuilder.group({
      reason_rejection: [null, Validators.required]
    });
  }

  isFieldInvalid(form: FormGroup, field: string) {
    /*     console.log(form.get(field).valid);
        console.log(form.get(field).value);
        console.log(form.get(field).touched); */
    return (
      (!form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldValid(form: FormGroup, field: string) {
    return (
      (form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldHasError(form: FormGroup, field: string, error: string) {
    return (
      (form.get(field).hasError(error))
    );
  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
