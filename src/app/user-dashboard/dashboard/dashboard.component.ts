import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SessionDataService } from '../../session-data/session-data.service';
import { UserDashboardSingletonService } from '../user-dashboard-api/user-dashboard-singleton.service';
import * as CanvasJS from '../../../assets/js/canvasjs-2.3.2/canvasjs.min.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    bpform: FormGroup;
    moodform: FormGroup;
    showBPForm = true;
    showMoodForm = false;
    confirmFormsInputs = false;
    bpform_submissions = [];
    submissions_count = 0;
    show_bpform_errors = false;
    userdata;
    user;

    constructor(
        private fb: FormBuilder,
        private dataservice: UserDashboardSingletonService,
        private session_data: SessionDataService,
    ) {}

    ngOnInit() {
        this.user = this.session_data.user
        this.dataservice.getClientBPDataList(this.user['id']).subscribe(dataset => {
            this.userdata = dataset;
            this.renderGraph();
        }, (error) => {
    
        });

        this.bpform = this.fb.group({
            SBP: new FormControl('',Validators.required),
            DBP: new FormControl('',Validators.required),
            pulse_rate: new FormControl('',Validators.required)
        });

        this.moodform = this.fb.group({
            mood: new FormControl(''), 
        })
    }

    onSubmitBPForm(bp_form_value) {
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
                this.showMoodForm = true;
            } else {
                this.bpform_submissions = []
                this.submissions_count = 0;
                this.showBPForm = true;
            }
        } else {
            this.show_bpform_errors = true;
        }
    }

    onSubmitMoodForm(){
        this.showMoodForm = false;
        this.showBPForm = false;
        this.confirmFormsInputs = true;
    }

    confirmedSubmitions(){
        const clientBPdata = {
            'users':this.user['id'],
            'blood_pressure': this.bpform_submissions,
            'client_mood': this.moodform.value['mood']
        }

        this.dataservice.uploadTestResults(clientBPdata).subscribe(data => {
            this.userdata = data;
            this.renderGraph()
            this.bpform_submissions = [];
            this.submissions_count = 0;
            this.showBPForm = true;
            this.showMoodForm = false;
            this.confirmFormsInputs = false;
        }, (error) => {

        });
    }

    renderGraph(){
        const systolicDataPoints = []
        const diastolicDataPoints = []
        const pulseDataPoints = []
        // const dates = []

        if(this.userdata.length > 0){
            this.userdata = this.dataservice.setDateTime(this.userdata)
            
            let graphData;
            if(this.userdata.length > 7){
                graphData = this.userdata.slice((this.userdata.length-7));
            } else {
                graphData = this.userdata
            }
            let x = 'string';
            for(let data of graphData){
                systolicDataPoints.push(this.dataPointObject(data.average_SBP_per_upload, data.date))
                diastolicDataPoints.push(this.dataPointObject(data.average_DBP_per_upload, data.date))
                pulseDataPoints.push(this.dataPointObject(data.average_pulse_rate_per_upload, data.date))
                // x++;
            }
        }

        let chart = new CanvasJS.Chart("chartContainer", {
        title:{
            text: "Blood Pressure Analysis for Past Week"
        },
        // axisX: {
        //     valueFormatString: "MMM YYYY"
        // },
        axisY:[
        //     {
        //     title: "Order",
        //     lineColor: "#C24642",
        //     tickColor: "#C24642",
        //     labelFontColor: "#C24642",
        //     titleFontColor: "#C24642",
        //     suffix: "k"
        // },
        {
            title: "Blood Pressure in mmHg",
            lineColor: "#369EAD",
            tickColor: "#369EAD",
            labelFontColor: "#369EAD",
            titleFontColor: "#369EAD",
            suffix: "mm Hg"
        }],

        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
        },
        data: [{
            type: "line",
            name: "Systolic BP",
            color: "#369EAD",
            showInLegend: true,
            axisYIndex: 1,
            dataPoints: systolicDataPoints
            },
        {
            type: "line",
            name: "Diastolic BP",
            color: "#C24642",
            axisYIndex: 0,
            showInLegend: true,
            dataPoints: diastolicDataPoints
        }]
        });
        chart.render();        
    }

    dataPointObject(y,x){
        x = new Date(x);
        var date = `${x.getDate()}/${x.getMonth() + 1}`
        const obj = {
            label: date,
            y: y
        }
        return obj;
    }

    get SBP() { return this.bpform.get('SBP'); }
    get DBP() { return this.bpform.get('DBP'); }
    get pulse_rate() { return this.bpform.get('pulse_rate'); }
}
