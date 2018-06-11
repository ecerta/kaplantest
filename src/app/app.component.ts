import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private element: ElementRef) {
  }

  public dataArray = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta'
  ];
  public selectedItemIndex = -1;
  private originalArray = this.dataArray.slice(0);

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Listends for up or down keystrokes
    if (this.selectedItemIndex >= 0 && (event.keyCode === 38 || event.keyCode === 40)) {
      this.element.nativeElement.querySelector('.active').focus();
    }
  }

  public resetItems () {
    this.selectedItemIndex = -1;
    this.dataArray = this.originalArray;
  }

  // I thought about making reorderBasic the function that gets called from the HTML page
  // But I thought just passing in the number could be confusing for a future dev looking at the HTML.
  public reorderItems(index, direction) {
    if (direction === 'up' && this.selectedItemIndex !== 0) {
      this.reorderBasic(index, -1);
    }
    if (direction === 'down' && this.selectedItemIndex !== (this.dataArray.length - 1)) {
      this.reorderBasic(index, 1);
    }
  }

  private reorderBasic(index, number) {
    const temp = this.dataArray[index + number];
    this.dataArray[index + number] = this.dataArray[index];
    this.dataArray[index] = temp;
    this.selectedItemIndex = index + number;
  }

}
