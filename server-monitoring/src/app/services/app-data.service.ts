import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }

  is_env_configure:boolean = false;
  showSelectedViewEnvironment: boolean = false;
  UserDto :any = null;
  widgets_data:any = [
    {
        "ID": "105265c0-e34f-4c2e-b8f1-adde9687fd9d",
        "Name": "Filtered List",
        "Position": 1,
        "Type": "Artifacts",
        "Elements": {
            "XAxis": false,
            "YAxis": false,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": true,
            "Modules_Selection": true,
            "Show_Columns": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "Show all the files related to selected filter."
    },
    {
        "ID": "2056d581-d59c-4138-b888-9dc5381ff635",
        "Name": "Pivot Table",
        "Position": 2,
        "Type": "Artifacts",
        "Elements": {
            "XAxis": true,
            "YAxis": true,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "The Pivot Table widget allows you to display tabular data based on selected pivot and filter."
    },
    {
        "ID": "83d509dd-631e-4fa0-8440-274007ef06a8",
        "Name": "Test Run Table",
        "Position": 1,
        "Type": "Artifacts",
        "Elements": {
            "TestXAxis": false,
            "TestYAxis": false,
            "EnableChart": false,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Modules_Selection_TestRun":true,
            "Filter_Selection": true,
            "Module_Selection_DC": false,
            "Date_Selection_TestRun": true,
            "Show_Columns": false,
            "XAxisStack": false,
            "YAxisStack": false,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
        },
        "Description": "This widget will allows you to view the test run details for selected date-range."
    },
    {
        "ID": "105265c0-e34f-4c2e-b9f1-adde9687fd8d",
        "Name": "Total Count",
        "Position": 3,
        "Type": "Artifacts",
        "Elements": {
            "Filter_Selection": true,
            "Modules_Selection": true,
            "ColorPicker": true,
            "Show_TotalCount": true,
            "Show_SubText": true,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "Show total count of selected filter"
    },
    {
        "ID": "106265c0-e34f-4c3e-b9f1-adde9688fd9d",
        "Name": "Remaining Days",
        "Position": 4,
        "Type": "Artifacts",
        "Elements": {
            "Filter_Selection": false,
            "Module_Selection_RM": true,
            "ColorPicker": true,
            "Release": true,
            "Sprint": false,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "Show remaining days in a release or milestone as per planned end date."
    },
    {
        "ID": "105265c0-e34f-4c2e-b8f1-adde9687fd9c",
        "Name": "Two Dimensional Filter Statistics",
        "Position": 5,
        "Type": "Artifacts",
        "Elements": {
            "XAxis": true,
            "YAxis": true,
            "EnableChart": true,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "Display statistics of tickets related to selected filter."
    },
    {
        "ID": "106888c0-e34f-4c3e-b9f1-adde9688fd9d",
        "Name": "Donut Chart",
        "Position": 6,
        "Type": "Artifacts",
        "Elements": {
            "Filter_Selection": true,
            "Module_Selection_DC": true,
            "Columns_Selection": false,
            "Show_Columns": false,
            "Pivot_Field": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "This widget displays the matching filter content as a donut chart."
    },
    {
        "ID": "106899c0-e34f-4c3e-b9f1-abbe9688fd4d",
        "Name": "Bar Chart",
        "Position": 7,
        "Type": "Artifacts",
        "Elements": {
            "Filter_Selection": true,
            "Module_Selection_DC": true,
            "Columns_Selection": false,
            "Show_Columns": false,
            "Pivot_Field": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "This widget displays the matching filter content as a bar chart."
    },
    {
        "ID": "111119c0-e34f-4c3e-b9f1-abbe9611fd4d",
        "Name": "Stacked Bar Chart",
        "Position": 8,
        "Type": "Artifacts",
        "Elements": {
            "Filter_Selection": true,
            "Module_Selection_DC": true,
            "Show_Columns": false,
            "XAxisStack": true,
            "YAxisStack": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": false,
            "ObservabilityGroup_Selection": false,
            "ObservabilityGroup_Count": 0,
            "Observability_Recording_Selection":false
            
        },
        "Description": "This widget displays the matching filter content as a stacked bar chart."
    }, 
    {
        "ID": "f8aaddd1-bf3b-4e1d-b612-834a8d82b913",
        "Name": "Observability Pie Chart",
        "Position": 9,
        "Type": "Observability",
        "Elements": {
            "XAxis": false,
            "YAxis": false,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_Columns": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": true,
            "ObservabilityGroup_Selection": true,
            "ObservabilityGroup_Count": 1,
            "Observability_Recording_Selection":true
            
        },
        "Description": "Show all the files related to selected filter."
    }, 
    {
        "ID": "2b07b2fc-fda6-44df-ba5f-2d108aca3cce",
        "Name": "Observability Tree Map",
        "Position": 10,
        "Type": "Observability",
        "Elements": {
            "XAxis": false,
            "YAxis": false,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_Columns": true,
            "Show_TotalCount": false,
            "Show_SubText": false,
            "Application_Selection": true,
            "ObservabilityGroup_Selection": true,
            "ObservabilityGroup_Count": 2,
            "Observability_Recording_Selection":true
            
        },
        "Description": "Show all the files related to selected filter."
    }, 
    {
        "ID": "ae5069f2-dddf-425c-958a-9c4f059d2459",
        "Name": "Observability Bar Graph",
        "Position": 10,
        "Type": "Observability",
        "Elements": {
            "XAxis": false,
            "YAxis": false,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_Columns": true,
            "Show_TotalCount": false,
            "Show_SubText": false,            
            "Application_Selection": true,
            "ObservabilityGroup_Selection": true,
            "ObservabilityGroup_Count": 2,
            "Observability_Recording_Selection":true
        },
        "Description": "Show all the files related to selected filter."
    }, 
    {
        "ID": "2cb5e434-a81b-4bf5-86d2-e8ec3ef55ab1",
        "Name": "Observability Line Graph",
        "Position": 10,
        "Type": "Observability",
        "Elements": {
            "XAxis": false,
            "YAxis": false,
            "EnableChart": false,
            "Filter_Selection": true,
            "Columns_Selection": false,
            "Modules_Selection": false,
            "Show_Columns": true,
            "Show_TotalCount": false,
            "Show_SubText": false,            
            "Application_Selection": true,
            "ObservabilityGroup_Selection": true,
            "ObservabilityGroup_Count": 2,
            "Observability_Recording_Selection":true
        },
        "Description": "Show all the files related to selected filter."
    }



    
]
  setSelectedViewEnvironmentVisibility(visible: boolean) {
    this.showSelectedViewEnvironment = visible;
  }
}
