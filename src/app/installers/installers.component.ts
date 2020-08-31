import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-installers',
  templateUrl: './installers.component.html',
  styleUrls: ['./installers.component.css']
})
export class InstallersComponent implements OnInit {

  constructor() { }

  @Input() showAvailable: boolean;
  @Input() installers: any[];
  @Output() onCustom: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onChange(e) {
    if(!e.srcElement.checked) {
      e.srcElement.checked = false;
      this.onCustom.emit(false);
    } else {
      this.onCustom.emit(true);
    }
  }

  testing(elem: HTMLInputElement, days: Date[]): void {
    this.onCustom.emit({showAvailable: (elem.checked = !elem.checked), availableDays: days});
  }

}
