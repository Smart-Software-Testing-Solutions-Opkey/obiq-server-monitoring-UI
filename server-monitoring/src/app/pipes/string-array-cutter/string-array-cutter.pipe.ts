import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringArrayCutter',
  standalone: true,
})
export class StringArrayCutterPipe implements PipeTransform {

 
    transform(dataItem1: any, dataItem2: any, dataItem3: any, dataItem4: any, type: any): any { 
        if (type == "string_array_cutter") {
           
          return this.string_array_cutter(dataItem1, dataItem2);
        } 
        else if (type == "string_array_comma") {
          return this.string_array_comma(dataItem1);
        }
        else if (type == "obj_type_array_cutter") {
            dataItem1= JSON.parse(JSON.stringify(dataItem1))
          return this.obj_type_array_cutter(dataItem1, dataItem2, dataItem3, dataItem4)
        }
        else if (type == "obj_array_comma") {
          return this.obj_array_comma(dataItem1, dataItem2, dataItem3);
        }
        else if (type == "obj_type_array_comma") {
            dataItem1= JSON.parse(JSON.stringify(dataItem1))
          return this.obj_type_array_comma(dataItem1, dataItem2, dataItem3);
        }
      return null;
   }


  string_array_cutter(dataItem1: any, dataItem2: any) {
   
      var final_string = "";
      for (let i = 0; i < dataItem1.length; i++) {
          var comma = "";
          if (i < dataItem1.length - 1) {
              comma = ", "
          }
          final_string = final_string  + dataItem1[i]+comma;
      }

      if (final_string != null && final_string != "") {
          if (final_string.length > dataItem2) {
              final_string = final_string.substring(0, dataItem2) + "...";
          }
      }
      return final_string;
  }


  string_array_comma(dataItem1: any) {
      var final_string = "";
      for (let i = 0; i < dataItem1.length; i++) {
          var comma = "";
          if (i < dataItem1.length - 1) {
              comma = ", "
          }
          final_string = final_string +dataItem1[i]+ comma;
      }
      return final_string;
  }

  obj_type_array_cutter(array_items: any, string_length: any, obj_items: any, columnname: any) {
    var final_string = "";
    for (let i = 0; i < array_items.length; i++) {
        var comma = "";
        if (i < array_items.length - 1) {
            comma = ", "
        }
        var item = array_items[i][columnname];

        if (obj_items.hasOwnProperty(item)) {
            var selected_obj = obj_items[item];
            final_string = final_string + selected_obj[columnname] + comma;
        }
    }

    if (final_string != null && final_string != "") {
        if (final_string.length > string_length) {
            final_string = final_string.substring(0, string_length) + "...";
        }
    }
    return final_string;
  }

obj_array_comma(array_items: any, obj_items: any, columnname: any) {

    var final_string = "";
    for (let i = 0; i < array_items.length; i++) {
        var comma = "";
        if (i < array_items.length - 1) {
            comma = ", "
        }
        var item = array_items[i][columnname];
        if (obj_items.hasOwnProperty(item)) {
            var selected_obj = obj_items[item];
          final_string = final_string + (selected_obj[columnname]) + comma;
        }
    }
    return final_string;
}

obj_type_array_comma(array_items: any, obj_items: any, columnname: any) {
 
      var final_string = "";
      for (let i = 0; i < array_items.length; i++) {
          var comma = "";
          if (i < array_items.length - 1) {
              comma = ", "
          }
          var item = array_items[i][columnname];

          if (obj_items.hasOwnProperty(item)) {

              var selected_obj = obj_items[item];

              final_string = final_string + (selected_obj[columnname]) + comma;

          }
      }
      return final_string;
  }

}