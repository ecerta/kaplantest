import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render all of the items from dataArray on the page', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li')[0].textContent).toContain('Alpha');
    expect(compiled.querySelectorAll('li')[3].textContent).toContain('Delta');
  }));

  describe('item selection', () => {

    it('should have nothing selected by default', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('.active')).toBe(null);
    }));

    it('should apply the selected class to a selected option', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      compiled.querySelectorAll('li')[0].click();
      fixture.detectChanges();

      expect(compiled.querySelector('.active').textContent).toContain('Alpha');
    }));

    it('should alter the assistive text when an item is selected', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelector('.assistive-text').textContent).not.toContain('The active item is Alpha');

      compiled.querySelectorAll('li')[0].click();
      fixture.detectChanges();

      expect(compiled.querySelector('.assistive-text').textContent).toContain('The active item is Alpha');
    }));

  });

  describe('reordering items', () => {
    it('should do nothing if down is calld on the last item', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      component.selectedItemIndex = 3;
      component.reorderItems(3, 'down');
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[0].textContent).toContain('Alpha');
      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Beta');
      expect(compiled.querySelectorAll('li')[2].textContent).toContain('Gamma');
      expect(compiled.querySelectorAll('li')[3].textContent).toContain('Delta');
    }));
    it('should do nothing if up is calld on the first item', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      component.selectedItemIndex = 0;
      component.reorderItems(0, 'up');
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[0].textContent).toContain('Alpha');
      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Beta');
      expect(compiled.querySelectorAll('li')[2].textContent).toContain('Gamma');
      expect(compiled.querySelectorAll('li')[3].textContent).toContain('Delta');
    }));
    it('should reorder items correctly when reorderItems is called for down', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      component.reorderItems(0, 'down');
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[0].textContent).toContain('Beta');
      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Alpha');
    }));

    it('should reorder items correctly when reorderItems is called for up', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      component.reorderItems(2, 'up');
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Gamma');
      expect(compiled.querySelectorAll('li')[2].textContent).toContain('Beta');
    }));

    it('should reorder items appropriately when reset Items is called', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;

      component.reorderItems(2, 'up');
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Gamma');
      expect(compiled.querySelectorAll('li')[2].textContent).toContain('Beta');

      component.resetItems();
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('li')[1].textContent).toContain('Beta');
      expect(compiled.querySelectorAll('li')[2].textContent).toContain('Gamma');
    }));
  });

  describe('up and down buttons', () => {
    it('should disable both up and down buttons by default', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('button')[0].disabled).toBe(true);
      expect(compiled.querySelectorAll('button')[1].disabled).toBe(true);
    }));

    it('should disable the up button when the first option is selected', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      compiled.querySelectorAll('li')[0].click();

      fixture.detectChanges();

      expect(compiled.querySelectorAll('button')[0].disabled).toBe(true);
      expect(compiled.querySelectorAll('button')[1].disabled).toBe(false);
    }));

    it('should disable the down button when the last option is selected', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      compiled.querySelectorAll('li')[3].click();
      fixture.detectChanges();

      expect(compiled.querySelectorAll('button')[0].disabled).toBe(false);
      expect(compiled.querySelectorAll('button')[1].disabled).toBe(true);
    }));
  });

  // I started trying to test the arrow key functions, but after an hour of debugging I hit my timebox for other
  // things I needed to do over the weekend. I've left my last stopping point here.
  // If I could've gotten this to work, I'd've added another test for ArrowDown, and for making sure ArrowUp and
  // ArrowDown don't work if the first/last item is selected, respectively.

  // describe('up and down arrow keys', () => {
  //   it('shouldnt do anything unless something is already selected', async(() => {

  //     const fixture = TestBed.createComponent(AppComponent);
  //     fixture.detectChanges();
  //     let compiled = fixture.debugElement.nativeElement;
  //     // const spy = spyOn(compiled, 'reorderItems');
  //     const event = new KeyboardEvent('keypress', {
  //       'key': 'ArrowUp',
  //     });

  //     expect(compiled.querySelectorAll('li')[3].textContent).toContain('Delta');
  //     expect(compiled.querySelectorAll('li')[2].textContent).not.toContain('Delta');
  //     expect(compiled.querySelectorAll('li')[2].textContent).toContain('Gamma');

  //     compiled.querySelectorAll('li')[3].click();
  //     fixture.detectChanges();

  //     fixture.nativeElement.dispatchEvent(event);
  //     fixture.detectChanges();

  //     compiled = fixture.debugElement.nativeElement;

  //     // Third item in list should be active
  //     // Former third item (Gamma) and fourth item (Delta) should've switched places
  //     expect(compiled.querySelector('.active').textContent).toContain('Delta');
  //     expect(compiled.querySelectorAll('li')[2].textContent).toContain('Delta');
  //     expect(compiled.querySelectorAll('li')[3].textContent).not.toContain('Delta');
  //     expect(compiled.querySelectorAll('li')[3].textContent).toContain('Gamma');
  //   }));
  // });

});

// Given more time I'd do more reading into how to refactor some of this repetition out into a consistent beforeAll()
