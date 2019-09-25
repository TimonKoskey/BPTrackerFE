import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import * as Chart from 'chart.js';
import { SessionDataService } from '../../session-data/session-data.service';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    bpform: FormGroup;
    showBPForm = true;
    bpform_submissions = [];
    submissions_count = 0;
    show_bpform_errors = false;
    user;

    constructor(
        private fb: FormBuilder,
        private dataservice: UserDashboardSingletonService,
        private session_data: SessionDataService,
    ) {}

    ngOnInit() {
        this.user = this.session_data.user
        this.dataservice.getClientBPDataList(this.user['id']).subscribe(data => {
          console.log(data)
        }, (error) => {
    
        });

        this.bpform = this.fb.group({
            SBP: new FormControl('',Validators.required),
            DBP: new FormControl('',Validators.required),
            pulse_rate: new FormControl('',Validators.required)
        });
        var SBP = [121,118,115,118,123,116,119];
        var DBP = [88,83,79,83,89,79,80];
        var Dates = ['02-May','03-May','04-May','05-May','06-May','07-May','08-May'];
        
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
        if (this.bpform.valid){ 
            if(this.submissions_count < 2){
                const submission = {
                    'SBP': bp_form_value.SBP,
                    'DBP': bp_form_value.DBP,
                    'pulse_rate': bp_form_value.pulse_rate,
                    'datetime': new Date()
                }
                this.bpform_submissions.push(submission)
                this.submissions_count = this.bpform_submissions.length;
                this.bpform.reset()
            } else if(this.submissions_count === 2){
                const submission = {
                    'SBP': bp_form_value.SBP,
                    'DBP': bp_form_value.DBP,
                    'pulse_rate': bp_form_value.pulse_rate,
                    'datetime': new Date()
                }
                this.bpform_submissions.push(submission)
                this.submissions_count = this.bpform_submissions.length;
                this.bpform.reset()
                this.showBPForm = false;
            } else {
                this.bpform_submissions = []
                this.submissions_count = 0;
                this.showBPForm = true;
            }
        } else {
            this.show_bpform_errors = true;
        }
    }

    confirmedSubmit(){
        this.bpform_submissions = []
        this.submissions_count = 0;
        this.showBPForm = true;
    }
}
