import { TestBed, ComponentFixture } from '@angular/core/testing';
import { WordCounterComponent } from './word-counter.component';

describe('WordCounterComponent', () => {
  let component: WordCounterComponent;
  let fixture: ComponentFixture<WordCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordCounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update word count and frequencies when content changes', () => {
    component.content = 'test test test1 test1 test2 test3';
    const changes = {
      content: {
        currentValue: component.content,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    component.ngOnChanges(changes);
    expect(component.wordCount).toBe(6);

    expect(component.wordFrequencies['test']).toBe(2);
    expect(component.wordFrequencies['test1']).toBe(2);
    expect(component.wordFrequencies['test2']).toBe(1);
    expect(component.wordFrequencies['test3']).toBe(1);
  });
});
