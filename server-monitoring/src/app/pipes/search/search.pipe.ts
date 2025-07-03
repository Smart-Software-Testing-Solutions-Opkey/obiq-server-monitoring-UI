import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(array: any, column, args?: any): any {
 
    if (!args) {
        return array;
    }

    let  lower_args = args.toLocaleLowerCase();

    if (column == null) {
        return array.filter((value: any) => {
            return (value.toLocaleLowerCase().includes(lower_args));
        })

    } else {

        return array.filter((value: any) => {
            return (value[column].toLocaleLowerCase().includes(lower_args)) ;
        })

    }


}



}