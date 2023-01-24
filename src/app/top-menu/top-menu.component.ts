import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent {
  
  @Output()
  addQEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  addMEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  addLinkEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  unlinkEvent: EventEmitter<void> = new EventEmitter();
}
