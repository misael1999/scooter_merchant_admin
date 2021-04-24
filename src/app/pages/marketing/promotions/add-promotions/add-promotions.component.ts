import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PromotionsMerchantsService } from 'src/app/services/promotions-merchants.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import * as Moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HourIntervalsComponent } from './hour-intervals/hour-intervals.component';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.scss']
})
export class AddPromotionsComponent extends ValidationForms implements OnInit {
  formPromotions: FormGroup;
  loadingSave: boolean;
  // SCHEDULES
  loadingSchedule: boolean;
  schedules: Array<any> = [];
  tagsSelecteds: any[] = [];
  typePeriodicity: boolean;
  typeDiscountRate: boolean;
  campaignOne: FormGroup;
  fromDate;
  toDate;
  openingHour = '09:00:00';
  closedHour = '20:00:00';
  idPromotion;
  promotionID;

  constructor(
    private promotionsMerchants: PromotionsMerchantsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
    super();
    this.idPromotion = activatedRoute.snapshot.params.id;

    if (this.idPromotion) {
      this.getPromotionsByID();

      console.log(this.idPromotion);
    }


    this.fromDate = new Date();
    this.fromDate = Moment().format('YYY-MM-DD');
    this.toDate = new Date();
    console.log('Fechas', this.fromDate, this.toDate);
    this.buildForm();
  }

  ngOnInit(): void {
    this.getSchedules();
  }

  fromDateChange(event) {
    if (event.value) {
      this.fromDate = Moment(event.value).format('YYYY-MM-DD');
    }
    console.log(this.fromDate);
  }

  toDateChange(event) {
    if (event.value) {
      this.toDate = Moment(event.value).format('YYYY-MM-DD');
    }
  }



  tagsSelect(tagId, isDelete) {
    if (isDelete) {
      this.tagsSelecteds = this.tagsSelecteds.filter((tag) => tag !== tagId);
    } else {
      this.tagsSelecteds.push(tagId);
    }
    console.log(this.tagsSelecteds);
  }

  // Para saber si el tag esta en la lista que se agrego
  tagIndexOf(tagId) {
    return this.tagsSelecteds.indexOf(tagId);
  }






  // METHODS ADD PROMOTIONS ==========================================
  createPromotions() {
    if (this.formPromotions.invalid) {
      this.formPromotions.markAllAsTouched();
      return;
    }
    const value = this.formPromotions.value;
    console.log(value);
    console.log(this.openingHour);
    console.log(this.closedHour);

    const fromDateV = value.from_date + value.openingHour;
    const toDateV = value.to_date + value.closedHour;
    console.log('Fechas y hora', fromDateV, toDateV);

    const promotionsValue = {
      name: value.name,
      description: value.description,
      from_date: '2021-01-01 10:22',
      to_date: '2021-03-14 10:22',
      promotion_type: value.promotion_type,
      promotion_rule: {
        is_periodic: value.is_periodic,
        has_limit_usage: value.has_limit_usage,
        has_limit_discount_amount: value.has_limit_discount_amount,
        is_discount_percentage: value.is_discount_percentage,
        is_coupon_code: value.is_coupon_code,
        minimum_order_price: value.minimum_order_price,
        discount_amount: value.discount_amount,
        limit_discount_amount: value.limit_discount_amount,
        usage_limit: value.usage_limit,
        budget: value.budget,
      },
      time_intervals: value.time_intervals
    };

    console.log('Data form', promotionsValue);
    this.loadingSave = true;
    this.addPromotions(promotionsValue);
  }

  addPromotions(promotions) {
    this.promotionsMerchants.createPromotion(promotions)
      .subscribe((data) => {
        this.showSwalMessage('Promoción agregada correctamente');
        this.loadingSave = false;
      }, error => {
        this.showSwalMessage('error', error);

        this.loadingSave = false;
      });
  }

  buildForm() {
    this.formPromotions = this.fb.group({
      name: ['Descuento en envio'],
      description: ['La promocion tiene un descuento en el envio fijo o por porcentaje'],
      from_date: new Date(),
      to_date: new Date(),
      promotion_type: [1],
      is_periodic: [null, [Validators.required]],
      has_limit_usage: [false],
      has_limit_discount_amount: [false],
      is_discount_percentage: [null, [Validators.required]],
      is_coupon_code: [false],
      minimum_order_price: ['', [Validators.required]],
      discount_amount: ['', [Validators.required]],
      limit_discount_amount: [0],
      usage_limit: [1],
      budget: [100],
      openingHour: this.openingHour,
      closedHour: this.closedHour,
      time_intervals: this.fb.array([this.createTimeIntervalsForm()], Validators.required)
    });
  }

  createTimeIntervalsForm(): FormGroup {
    return this.fb.group({
      from_time: ['15:00'],
      to_time: ['22:00'],
      schedule_ids: [this.tagsSelecteds],
    });
  }


  // METHODS NECESSARY =======================
  getSchedules() {
    this.loadingSchedule = true;
    this.promotionsMerchants.getSchedules()
      .subscribe((data: any) => {
        this.schedules = data.data;
        this.loadingSchedule = false;
      }, error => {
        this.loadingSchedule = false;
      });
  }
  changeTypePeriodicity(value) {
    this.typePeriodicity = value === true ? true : false;
  }
  changeTypeDiscountRate(value) {
    this.typeDiscountRate = value === true ? true : false;
  }

  changeOpeningHour(value) {
    this.openingHour = value;
    console.log(this.openingHour);
  }
  changeCloseHour(value) {
    this.closedHour = value;
    console.log(this.closedHour);
  }



  // EDIT PROMOTIONS =============================0
  buildUpdatePromotions(promotions) {
    this.formPromotions = this.fb.group(
      {
        name: [promotions.name],
        description: [promotions.description],
        from_date: [promotions.from_date, Validators.required],
        to_date: [promotions.to_date, Validators.required],
        promotion_type: [promotions.promotion_type],
        is_periodic: [promotions.vehicle_model, Validators.required],
        has_limit_usage: [promotions.vehicle_year, Validators.required],
        has_limit_discount_amount: [promotions.vehicle_color, Validators.required],
        is_discount_percentage: [promotions.vehicle_type_id, Validators.required],
        is_coupon_code: [promotions.vehicle_type_id, Validators.required],
        minimum_order_price: [promotions.vehicle_type_id, Validators.required],
        discount_amount: [promotions.discount_amount, Validators.required],
        limit_discount_amount: [promotions.limit_discount_amount],
        usage_limit: [promotions.usage_limit],
        budget: [promotions.budget],
        openingHour: [promotions.openingHour, Validators.required],
        closedHour: [promotions.closedHour, Validators.required],
      }
    );
  }

  addCustomSchedule() {
    const dialogRef = this.dialog.open(HourIntervalsComponent, {
      disableClose: true,
      width: '40%',
      minWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(data => {
      // if (typeof data == 'object') {
      //   this.menus.push(data);
      //   if (this.product) {
      //     this.menu_categories_add.push(data);
      //   }
      // }
    });
  }




  getPromotionsByID() {
    this.loadingSave = true;
    this.promotionsMerchants.getPromotionsById(this.idPromotion)
      .subscribe((resp: any) => {
        this.promotionID = resp;
        console.log(this.promotionID);
        this.loadingSave = false;
      }, error => {
        this.loadingSave = false;
        console.log('Error al consultar la promocion');
      });
  }


}
