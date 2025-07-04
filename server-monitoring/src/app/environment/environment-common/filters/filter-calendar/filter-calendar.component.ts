import { Component, Input, OnInit, output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar, NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {  inject } from '@angular/core';

@Component({
  selector: 'app-filter-calendar',
  templateUrl: './filter-calendar.component.html',
  styleUrl: './filter-calendar.component.scss'
})
export class FilterCalendarComponent implements OnInit{

  selectedFromDate : any;
  selectedToDate : any;
  @Input('child_data') set child_data({ selectedFromDate , selectedToDate }) {
      if(selectedFromDate){
        this.selectedFromDate = new NgbDate(selectedFromDate.year,selectedFromDate.month,selectedFromDate.day);
      }
      if(selectedToDate){
        this.selectedToDate = new NgbDate(selectedToDate.year,selectedToDate.month,selectedToDate.day);
      }

      if(this.selectedFromDate && this.selectedToDate){
        
          this.fromDate=this.selectedFromDate
         this.toDate= this.selectedToDate
         this.formatRange();
      
      }
      
		 

    }
	ngOnInit(): void {
		this.onToDateChange.emit(this.fromDate);
		this.onFromDateChange.emit(this.toDate);
	}
  calendar = inject(NgbCalendar);

	hoveredDate: NgbDate | null = null;
	fromDate: NgbDate = this.calendar.getToday();
	toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);
    onFromDateChange : any = output<any>();
    onToDateChange : any = output<any>();
    isClose:boolean=false

  
	onDateSelection(date: NgbDate) {
		
    if(this.fromDate && this.toDate){
      this.isClose=true;

  }
		if(!this.fromDate || !this.toDate ) this.isClose=false
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
      this.selectedFromDate = this.fromDate;
      this.selectedToDate = this.toDate
      this.onToDateChange.emit(this.selectedToDate);
      this.onFromDateChange.emit(this.selectedFromDate);
		} else {
			this.toDate = null;
			this.fromDate = date;
		}
	}
  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  
	formatRange(): string {
		console.log("herereeeee")
		const from = this.fromDate
			? `${this.fromDate.day.toString().padStart(2, '0')}/${this.fromDate.month.toString().padStart(2, '0')}/${this.fromDate.year}`
			: '';
		const to = this.toDate
			? `${this.toDate.day.toString().padStart(2, '0')}/${this.toDate.month.toString().padStart(2, '0')}/${this.toDate.year}`
			: '';
		return this.toDate ? `${from} - ${to}` : from;
	}

 
 

}
