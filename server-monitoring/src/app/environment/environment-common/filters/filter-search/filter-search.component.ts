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
    this.isSearchToggled = !this.isSearchToggled;
    this.openSearch = !this.openSearch
    setTimeout(() => {
      this.searchInput?.nativeElement?.focus()
    }, 200);
  }
  openSearch = false;
  isSearchToggled = false;
  searchModel:string = null
  clearSearch(){
    this.searchModel = null
  }
  sendSearchvalue(val){
    this.searchedText.emit(val)
  }
 
}
