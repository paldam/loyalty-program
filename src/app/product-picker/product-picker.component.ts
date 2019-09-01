import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Prize} from '../model/prize';
import {PrizeService} from './prize-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-product-picker',
    templateUrl: './product-picker.component.html',
    styleUrls: ['./product-picker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductPickerComponent implements OnInit {
    public prize: Prize[] = [];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder, prizeService: PrizeService) {
        prizeService.getPrize().subscribe(data => {
            this.prize = data;
        });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
}
