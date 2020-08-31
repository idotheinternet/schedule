import { Component, OnInit, Output, EventEmitter } from '@angular/core';
export interface WorkCrew {
  name: string;
  score: number;
  days: number[];
  details?: string[];
}
@Component({
  //selector: 'app-scheduler',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {

  constructor() { }

  schedules: string[] = ['Aug 28, 2020'];

  showAvailable: boolean;
  allInstallers: WorkCrew[];
  installers: WorkCrew[];
  days: any[];
  firstDay: number;
  currentDay: number;
  currentMonth: number;
  available: boolean;
  availableDays: Date[];
  lookupDate: Date;
  startDate: Date = new Date();
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthDays: number[];

  ngOnInit() {
    this.setMonthDays();
    this.setCalendar();
    this.setInstallers();
  }

  setMonthDays(): void {
    let i: number = 1;
    const date: Date = this.startDate,
    len: number = Number(new Date(date.getFullYear(), this.currentMonth = date.getMonth(), 0).getDate()), 
    arr: number[] = [];
    for(; i <= len; i++) arr.push(i);
    this.monthDays = arr;
  }

  onCustom(e): void {
    this.showAvailable = e.showAvailable;
    this.availableDays = e.availableDays;
  }

  getCrews(e): void {
    if(e === this.lookupDate) return this.installers = this.allInstallers, this.lookupDate = null;
    let i: number = 0,
    j: number,
    daysLen: number,
    installer: any;
    const installers = this.installers,
    len: number = installers.length,
    arr: any[] = [];
    this.lookupDate = e;
    for(; i < len; i++) {
      installer = installers[i];
      j = 0;
      daysLen = installer.days.length;
      for(j; j < daysLen; j++) if(installer.days[j] === e) arr.push(installer);
    }
    this.installers = arr;
  }

  setInstallers(): void {
    let i: number = 0;
    const len: number = 50,
    arr: WorkCrew[] = []
    for(; i < len; i++) {
      arr.push({
        name: 'Crew ' + Math.floor(Math.random() * 1000),
        score: Math.floor(50 + (Math.random() * 50)),
        days: this.setInstallerDays()
      });
    }
    arr.sort((a, b) => b.score - a.score);
    this.installers = this.allInstallers = arr;
  }

  setInstallerDays(): number[] {
    let i: number = 0;
    const days = this.days,
    len: number = days.length,
    arr: number[] = [];
    for(; i < len; i++) if(days[i].available && Math.floor(Math.random() * 3) === 1) arr.push(days[i].day);
    return arr;
  }

  setCalendar(): void {
    let i: number = 0,
    available: number,
    arr: any[] = [];
    const date: Date = new Date(),
    firstDay: number = this.firstDay = date.getDay(),
    currentDay: number = i = this.currentDay = date.getDate(),
    monthDays: number = Number(new Date(date.getFullYear(), date.getMonth(), 0).getDate()),
    remainder: number = (34 - firstDay) - (monthDays - currentDay);
    for(i; i <= monthDays; i++) arr.push({day: new Date(date.getFullYear(), date.getMonth(), i), status: available = Math.floor(Math.random() *4), available: (available < 3)});
    i = 0;
    for(i; i < remainder; i++) arr.push({day: new Date(date.getFullYear(), date.getMonth() + 1, i+1), status: available = Math.floor(Math.random() *4), available: (available < 3)});
    this.days = arr;
  }

  getMonthName(val: number): string {
    const date: Date = new Date();
    return new Date(date.getFullYear(), date.getMonth()+val).toLocaleString('default', { month: 'short' });
  }

}
