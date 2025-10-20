import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  placeholderInput = input<string>();
  onSearchEmmit = output<string>();

  onSearch(value:string){
    this.onSearchEmmit.emit(value);
  }

}
