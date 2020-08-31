import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, SimpleChange, Output } from '@angular/core';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() days: any[];
  @Input() firstDay: number;
  @Input() currentDay: number;
  @Input() availableDays: Date[];
  @Input() lookupDate: Date;
  available: boolean;
  @Input() showAvailable: boolean;
  @Output() getCrews: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    
  }

  getAvailable(day: Date): boolean {
    let i: number = 0;
    const days: Date[] = this.availableDays,
    len: number = days.length;
    for(; i < len; i++) if(day === days[i]) return true;
    return false;
  }

  getMonthName(val: number): string {
    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth()+val).toLocaleString('default', { month: 'short' });
  }

  getDay(date: Date): number {
    return date.getDate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if(changes['showAvailable']) console.log("as;dlfkja");
  }

}
