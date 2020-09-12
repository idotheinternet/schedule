import { Component, OnInit } from '@angular/core';
import { EmptyError } from 'rxjs';

export interface Installer {
  name: string;
  score: number;
  expanded?: boolean;
}

export interface Day {
  date: Date;
  status?: number;
  installers?: Installer[];
  unavailables?: Installer[];
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  schedule: any;
  schedules: any[] = ['9/11/2020'];
  calendar: Day[];
  selectedDate: Date;
  firstDay: number;
  rangeMode: boolean;
  installerView: boolean;
  availableView: boolean = true;
  azView: boolean;
  idx: number = 0;
  installer: Installer;
  showExtra: boolean;
  amt: number = 1;
  duration: number = 0;
  time: number = 8 + this.amt;
  trueTime: number = 1;
  isAm: boolean = true;
  scheduleView: boolean;

  ngOnInit(): void {
    //this.setLocal();
    this.setCalendar();
  }

  createSchedule(): void {
    this.scheduleView = !this.scheduleView;
  }

  changeTime(elem: HTMLInputElement): void {
    const val: number = Number(elem.value);
    if(val === 13) {
      this.isAm = false;
      elem.value = "1";
      this.time = 1 + this.amt;
      return;
    }
    if(!val) {
      this.isAm = true;
      elem.value = "12";
      this.time = this.amt;
      return;
    }
    this.time = (val + this.amt <= 12 ? (val + this.amt) : this.amt);
  }

  changeAmt(elem: HTMLInputElement): void {
    this.amt = Number(elem.value);
    //this.time = (this.time + this.amt <= 12 ? (this.time + this.amt) : this.amt);
    console.log(this.amt);
  }

  changeDuration(elem: HTMLSelectElement): void {
    this.duration = Number(elem.value);
    console.log(this.duration);
  }

  showEx(): void {
    this.showExtra = !this.showExtra;
  }

  expand(installer: Installer): void {
    installer.expanded = !installer.expanded;
    console.log(installer.expanded);
  }

  setLocal(): void {
    !localStorage.getItem('schedules') ? 
    localStorage.setItem('schedules', JSON.stringify([])) : 
    this.schedule = JSON.parse(localStorage.getItem('shedules'))[0];
  }

  initMonth(date: Date): Day[] {
    let i: number = 1;
    const len: number = date.getDate(),
    arr: Day[] = [];
    console.log(len);
    for(; i <= len; i++) arr.push({date: new Date(date.getFullYear(), date.getMonth(), i)});
    return arr;
  }

  setCalendar(): void {
    const date: Date = new Date(),
    arr: Day[] = [];
    let i: number = 0,
    month: number = date.getMonth();
    for(; i < 13; i++) {
      let day: number = !i ? date.getDate() : 1;
      const len: number = Number(new Date(date.getFullYear(), month+1, 0).getDate());
      for(; day <= len; day++) arr.push({ date: new Date(date.getFullYear(), month, day)});
      month+=1;
    }
    this.selectedDate = arr[0].date;
    this.firstDay = date.getDay();
    this.calendar = arr;
  }

  getDay(date: Date): number {
    return date.getDate();
  }

  selectDay(date: Date, idx: number): void {
    if(idx === this.idx) return;
    if(this.installerView && this.calendar[idx].status === undefined || this.calendar[idx].status === 2) this.installerView = false;
    this.selectedDate = date;
    this.idx = idx;
    console.log(this.idx);
  }

  getSelectedDate(): string {
    return this.selectedDate.toLocaleDateString('default', {month: 'long', day: 'numeric', year: 'numeric'});
  }

  initRange(): void {
    this.rangeMode = !this.rangeMode;
  }

  setInstallers(): Installer[] {
    let i: number = 0;
    const len: number = Math.floor(Math.random() * 15) + 1,
    arr: Installer[] = [];
    for(; i < len; i++) arr.push({
      name: 'Crew ' + Math.floor(Math.random() * 1000),
      score: Math.floor(50 + (Math.random() * 50)), 
      expanded: false
    });
    arr.sort((a, b) => b.score - a.score);
    return arr;
  }

  findAvailable(): void {
    let i: number = this.idx,
    status: number;
    const len: number = i + (!this.rangeMode ? 1 : 7);
    for(; i < len; i++) {
      status = Math.floor(Math.random() * 3);
      this.calendar[i].status = status;
      if(status !== 2) {
        this.calendar[i].installers = this.setInstallers();
        this.calendar[i].unavailables = this.setInstallers();
      } 
    }
    if(this.rangeMode) this.rangeMode = false;
  }

  getAvailability(): string {
    const status = this.calendar[this.idx].status;
    return !status ? 'OPEN' : status < 2 ? 'LOCKED - Please consult your manager before scheduling.' : 'CLOSED';
  }

  initView(view: boolean): void {
    if(view && (this.calendar[this.idx].status === undefined || this.calendar[this.idx].status === 2)) return;
    this.installerView = view;
  }

  initAvailable(view: boolean): void {
    this.availableView = view;
    if(view === null) this.calendar[this.idx].installers.sort((a, b) => Number(a.name.split(" ")[1]) - Number(b.name.split(" ")[1]));
    if(view) this.calendar[this.idx].installers.sort((a, b) => b.score - a.score);
  }

  selectInstaller(installer: Installer): void {
    this.installer = installer;
  }

}
