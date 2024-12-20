import { ChangeDetectorRef, Component, Input, output } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter-erp-process',
  templateUrl: './filter-erp-process.component.html',
  styleUrl: './filter-erp-process.component.scss'
})
export class FilterErpProcessComponent {

  constructor(
      public app_service: AppService,
       private cdr: ChangeDetectorRef
    ) {
    }

    @Input('child_data') set child_data({ selectedProcess,application,strmodules }) {
      this.selectedProcess = selectedProcess;
      this.application = application;
      this.strmodules = strmodules;

    }

    application= "ORACLEFUSION";
    strmodules= [];
  
    filterProcess: any = [
      "Record to Report",
      "Hire to Retire",
      "Time and Labor to Payroll",
      "Order to Cash",
      "Manufacturing",
      "Cash Management",
      "Benefits",
      "Performance Management",
      "Compensation",
      "Supplier Management",
      "Expenses",
      "Recruiting",
      "Sourcing",
      "Time and Labor to Absence Management",
      "Costing",
      "Asset To Retire",
      "Payables",
      "Receivables",
      "Absence Management",
      "Global HR to Absence Management",
      "Goal Management",
      "Learning",
      "Profile Management to Performance",
      "Global Payroll",
      "Talent Management to Learning",
      "Payroll",
      "Project to Invoice",
      "Inventory Management",
      "Procure to Pay",
      "Drop-Shipment Process",
      "Back to Back Process"
    ]

    selectedProcess: any = []
    onSelectedProcessChange = output<any>();
    search_filter: string = '';
    selectedCheckboxes: any = {};
    obj_process = {}   

   

    ngOnInit(): void {
      this.get_process();
    }

    
  
    get_process() {
      var ajax_url = environment.BASE_OBIQ_SERVER_URL + "testdiscovery/ERP/GetProcessesOfModules";
      let formData = { application: this.application, strmodules: this.strmodules }

      this.app_service.make_post_server_call(ajax_url, formData)
        .subscribe({
          next: (result: any) => {
            if (result && result.length) {
              console.log("-----result", JSON.stringify(result))
              this.filterProcess = result;
              
            }
          },
          error: (error: any) => {
            console.warn(error);
          }
        });
    }

    
  clear_search() {
    this.search_filter = '';

  }

  select_Process(e, item,ind) {
    if (e.target.checked) {
      this.selectedProcess.push(item);
      
    }
    else {
      this.selectedProcess.splice(ind,1);
    }
    
    let a = this.selectedProcess
    this.selectedProcess = JSON.parse(JSON.stringify(this.selectedProcess));
    this.onSelectedProcessChange.emit(this.selectedProcess);
    
  }

  clear_filter() {
    this.selectedProcess = [];
    this.filterProcess.forEach(item => {
      this.selectedCheckboxes[item] = false;
    });
    this.onSelectedProcessChange.emit(this.selectedProcess);

  }


}
