import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dataArray = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta'
  ];
  public selectedItemIndex = -1;
  private originalArray = this.dataArray.slice(0);

  public resetItems () {
    this.selectedItemIndex = -1;
    this.dataArray = this.originalArray;
  }

  // I thought about making reorderBasic the function that gets called from the HTML page
  // But I thought just passing in the number could be confusing for a future dev looking at the HTML.
  public reorderItems(index, direction) {
    if (direction === 'up') {
      this.reorderBasic(index, -1);
    }
    if (direction === 'down') {
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
