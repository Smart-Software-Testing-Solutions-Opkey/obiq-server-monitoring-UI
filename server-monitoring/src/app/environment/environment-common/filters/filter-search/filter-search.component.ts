import { Component, ViewChild, output } from '@angular/core';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss'
})
export class FilterSearchComponent {
  @ViewChild('searchInput') searchInput:any
  searchedText = output<any>()
  toggleSearch(){
    this.openSearch = !this.openSearch
    setTimeout(() => {
      this.searchInput.nativeElement
      .focus()
    }, 200);
  }
  openSearch = false
  searchModel:string = null
  clearSearch(){
    this.searchModel = null
  }
 
}
