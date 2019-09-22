import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import * as Chart from 'chart.js';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    bpform: FormGroup;
    showBPForm = true;
    submitedValues;
    private last_update_id = 0;
    mockData

    constructor(
        private fb: FormBuilder,
        private firestore: AngularFirestore,
        private dataservice: UserDashboardSingletonService,
    ) {}

    ngOnInit() {
        this.firestore.collection('patient-records').valueChanges().subscribe(data => {
            this.mockData = data;
            this.mockData.sort(function(a, b){return a.id - b.id})
            const last_update = this.mockData.length - 1
            this.last_update_id = this.mockData[last_update].id;
            console.log(this.last_update_id);
         });

        this.bpform = this.fb.group({
            SBP: '',
            DBP: '',
            date: ''
        });

        var SBP = [121,118,115,118,123,116,119,110,105,95,100,90];
        var DBP = [88,83,79,83,89,79,80,72,73,65,70,60];
        var Dates = ['02-May','03-May','04-May','05-May','06-May','07-May','08-May','09-May','10-May','11-May','12-May','13-May'];

        $(document).ready(function(){
        var canvas = <HTMLCanvasElement> document.getElementById('myChart');

        var ctx = canvas.getContext('2d');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Dates,
                datasets: [{
                    label: 'Systolic Blood Pressure (SBP)',
                    data: SBP,
                    backgroundColor: [
                        'rgba(248, 249, 250, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Diastolic Blood Pressure (DBP)',
                    data: DBP,
                    backgroundColor: [
                        'rgba(248, 249, 250, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1   
                }
            ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        })
    }

    onSubmit(bp_form_value) {
        this.submitedValues = bp_form_value;
        this.showBPForm = false;
    }

    confirmedSubmit(){
        const record = {};
        record['SBP'] = this.submitedValues.SBP;
        record['DBP'] = this.submitedValues.DBP;
        record['date'] = this.submitedValues.date;

        if (this.submitedValues.SBP > 139 || this.submitedValues.DBP >89 ){
            record['status'] = 'High'
        } else if(this.submitedValues.SBP > 119 || this.submitedValues.DBP >79){
            record['status'] = 'Elevated'
        } else if(this.submitedValues.SBP > 89 || this.submitedValues.DBP >59){
            record['status'] = 'Normal'
        }else{
            record['status'] = 'Low'
        }
        
        record['id'] = this.last_update_id + 1;

        this.firestore.collection('patient-records').add(record);

        this.showBPForm = true;
        this.bpform.reset()
    }
}
