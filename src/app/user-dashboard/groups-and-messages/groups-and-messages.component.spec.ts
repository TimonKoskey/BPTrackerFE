import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsAndMessagesComponent } from './groups-and-messages.component';

describe('GroupsAndMessagesComponent', () => {
  let component: GroupsAndMessagesComponent;
  let fixture: ComponentFixture<GroupsAndMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsAndMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsAndMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
