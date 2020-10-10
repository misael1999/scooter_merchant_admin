import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-munu-category-dialog',
  templateUrl: './munu-category-dialog.component.html',
  styleUrls: ['./munu-category-dialog.component.scss']
})
export class MunuCategoryDialogComponent implements OnInit {

  group: FormGroup;
  isRange = false;

  // Is update
  menu;
  options_to_delete;

  constructor(public dialogRef: MatDialogRef<MunuCategoryDialogComponent>,
    private fb: FormBuilder, private snack: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data?.menu) {
      this.buildUpdateForm();
      this.menu = data.menu;
      this.setFormData(this.menu);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {
  }

  setFormData({ have_quantity, id, is_obligatory, is_range, limit_options_choose, max_options_choose, max_quantity, min_options_choose, min_quantity, name, options }): void {

    this.group.get('name').setValue(name);
    this.group.get('is_obligatory').setValue(String(is_obligatory));
    this.group.get('is_range').setValue(String(is_range));
    this.group.get('id').setValue(id);
    if (is_range == true || is_range == 'true') {
      this.isRange = true;
      this.group.get('min_options_choose').setValue(min_options_choose);
      this.group.get('max_options_choose').setValue(max_options_choose);
    } else {
      this.isRange = false;
      this.group.get('limit_options_choose').setValue(limit_options_choose);
    }

    options.forEach(element => {
      this.addOptionUpdate(element);
    });

    // this.group.get('options').setValue(options);
  }

  buildForm() {
    this.group = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      is_obligatory: [null, Validators.required],
      is_range: ['false', Validators.required],
      limit_options_choose: [null],
      min_options_choose: [null],
      max_options_choose: [null],
      options: this.fb.array([this.createOptionForm()], Validators.required)
    });
  }
  buildUpdateForm() {
    this.group = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      is_obligatory: [null, Validators.required],
      is_range: ['false', Validators.required],
      limit_options_choose: [null],
      min_options_choose: [null],
      max_options_choose: [null],
      options: this.fb.array([], Validators.required)
    });
  }

  createOptionForm(): FormGroup {
    return this.fb.group({
      option_id: [null],
      name: [null, Validators.required],
      price: [0],
    });
  }
  createOptionUpdateForm({ id, name, price, option_id }): FormGroup {
    let idTemp = id;
    if (option_id != null) {
      idTemp = option_id;
    }
    return this.fb.group({
      option_id: [idTemp],
      name: [name, Validators.required],
      price: [price],
    });
  }

  get optionsFormData(): any { return this.group.get('options'); }

  addOption() {
    let optionsForm = this.group.get('options');
    if (optionsForm.invalid) {
      optionsForm.markAllAsTouched();
      return;
    }

    const forms: FormArray = optionsForm as FormArray;
    forms.push(this.createOptionForm());
  }

  // Para crear opciones con el formulario
  addOptionUpdate(option) {
    let optionsForm = this.group.get('options');
    const forms: FormArray = optionsForm as FormArray;
    forms.push(this.createOptionUpdateForm(option));
  }

  deleteOption(index) {
    let optionsForm = this.group.get('options');
    const forms: FormArray = optionsForm as FormArray;
    forms.removeAt(index);
  }

  deleteOptionUpdate(menu, idx) {
    Swal.fire({
      title: 'Desactivar opcion',
      text: `¿Esta seguro de desactivarlo?`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      let optionsForm = this.group.get('options');
      const forms: FormArray = optionsForm as FormArray;
      forms.removeAt(idx);
    });
  }

  saveMenuCategory() {
    // ======= VALIDACIONES ======== 
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }
    const menu = this.group.value;
    if (this.isRange) {
      if (menu.min_options_choose == null
        || menu.max_options_choose == null) {
        this.showMessageError('Ingresa el mínimo y máximo de articulos que el cliente puede seleccionar');
        return;
      }
      menu.limit_options_choose = 0;
    } else {
      if (menu.limit_options_choose == null) {
        this.showMessageError('¿Cuántos articulos puede seleccionar el cliente?');
        return;
      }
      menu.min_options_choose = 0;
      menu.max_options_choose = 0;
    }
    if (this.menu) {
      menu.menu_id = this.menu.id;
      // Actualizar menú
      this.dialogRef.close(menu);
    } else {
      this.dialogRef.close(menu);

    }
    // ======= TERMINA LAS VALIDACIONES ======== 
  }

  showMessageError(message) {
    return this.snack.open(message, '', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }


  changeTypeRange(value) {
    this.isRange = value == 'true' ? true : false;
  }

  isFieldInvalid(group: FormGroup, field: string): boolean {
    return (group.get(field).invalid && group.get(field).touched);
  }

  isFieldValid(group: FormGroup, field: string): boolean {
    return (group.get(field).valid && group.get(field).touched);
  }

  hasFieldError(group: FormGroup, field: string, errorcode: string): boolean {
    return (group.get(field).hasError(errorcode));
  }

}