import { Component ,OnInit,output,Input} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';
import { MsgboxService } from 'src/app/services/msgbox.service';

@Component({
  selector: 'app-filter-erp-module',
  templateUrl: './filter-erp-module.component.html',
  styleUrl: './filter-erp-module.component.scss'
})
export class FilterErpModuleComponent implements OnInit{

   constructor(
      public app_service : AppService,
      private msgbox: MsgboxService 
    ){
    }
  ngOnInit(): void {
    
  }
  application:any
 
   @Input('child_data') set child_data({application,selectedErpModule }) {
    if(application){
      this.application=application
    }
    if(selectedErpModule){
      this.selectedErpModule=selectedErpModule
    }
    this.get_erpmodules();
   }
  get_erpmodules() {
    var ajax_url = environment.BASE_OBIQ_SERVER_URL + "testdiscovery/ERP/GetModulesOfApplication";
    let formData = { application: this.application}

    this.app_service.make_get_server_call(ajax_url, formData)
       .subscribe({
         next: (result: any) => {
           if(result && result.length){
            
             this.filterErpModule = result; 
             this.tempfilterErpModule = result; 
             
         }},
         error: (error: any) => {
          this.msgbox.display_error_message(error);
           console.warn(error);
         }
      });
     }
  filterErpModule:any=[
    "Finance",
    "Human Capital Management",
    "Supply Chain Management",
    "Project Portfolio Management"
  ]
  selectedErpModule=[]
    
  tempfilterErpModule = [
    "Finance",
    "Human Capital Management",
    "Supply Chain Management",
    "Project Portfolio Management"
  ]
  onSelectedErpModuleChange = output<any>();
  search_filter: string = '';
  selectedCheckboxes: any = {};
  obj_env = {}
  ErpModuleChange(item){
    this.selectedErpModule = item;
    
    this.onSelectedErpModuleChange.emit(this.selectedErpModule);
  }
  handleFilter(data){
    this.filterErpModule = this.tempfilterErpModule.filter(
      (s) => s.toLowerCase().indexOf(data.toLowerCase()) !== -1
    );
  }

  clear_search() {
    this.search_filter = '';

  }
  clear_filter() {
    this.selectedErpModule = [];
    this.filterErpModule.forEach(item => {
      this.selectedCheckboxes[item] = false;
    });
    this.onSelectedErpModuleChange.emit(this.selectedErpModule );
  }
  selectErpModule(e, item,ind) {
    if (e.target.checked) {
      
      this.selectedErpModule.push(item);
   
    }
    else {
      this.selectedErpModule.splice(ind,1);
    }
    
 
    // this.selectedErpModule = JSON.parse(JSON.stringify(this.selectedErpModule));
    this.onSelectedErpModuleChange.emit(this.selectedErpModule );
    
  }
}
