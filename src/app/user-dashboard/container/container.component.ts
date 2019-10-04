import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../../session-data/session-data.service';
import { Router } from '@angular/router'
// import * as $ from 'jquery';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  sideNavState = "closed";

  constructor(
    private session_data: SessionDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    const media_size = window.matchMedia("(max-width: 1000px)")
    this.mediaQueryCheck(media_size)
    media_size.addListener(this.mediaQueryCheck);
  }

  mediaQueryCheck(media_size){
    var toggle_space = document.getElementById('toggle-space')
    var collapse_nav = document.getElementById('nav-collapse')
    if(media_size.matches){
      toggle_space.style.display = 'block';
      collapse_nav.classList.remove("justify-content-end");
      document.getElementById("sidebar-left").style.width = "0";
      document.getElementById("main-content").style.marginLeft= "0";
    } else {
      toggle_space.style.display = 'none';
      collapse_nav.classList.add("justify-content-end");
      document.getElementById("sidebar-left").style.width = "300px";
      document.getElementById("main-content").style.marginLeft = "300px";
    }
  }

  sideNav(){
    if (this.sideNavState === "open"){
      document.getElementById("sidebar-left").style.width = "0";
      document.getElementById("main-content").style.marginLeft= "0";
      this.sideNavState = "closed"
    } else if(this.sideNavState === "closed"){
      document.getElementById("sidebar-left").style.width = "250px";
      document.getElementById("main-content").style.marginLeft = "250px";
      this.sideNavState = "open";
    }
  }

  logout(){
    this.session_data.clearSessionData();
    this.router.navigate([''])
  }
}
