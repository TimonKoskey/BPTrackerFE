import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-and-messages',
  templateUrl: './groups-and-messages.component.html',
  styleUrls: ['./groups-and-messages.component.css']
})
export class GroupsAndMessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("your_groups_header").click();
  }

  changeTab(tab_id,elmnt,color){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for(let content of tabcontent){
      content.style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for(let content of tablinks){
      content.classList.remove("active");
    }

    document.getElementById(tab_id).style.display = "block";
    document.getElementById(elmnt).classList.add("active");
  }

}
