import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-word-counter',
  templateUrl: './word-counter.component.html',
  styleUrls: ['./word-counter.component.scss'],
})
export class WordCounterComponent implements OnChanges {
  @Input() content: string | null = null;

  wordCount = 0;
  wordFrequencies: { [word: string]: number } = {};
  uniqueWords: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.countWords(this.content || '');
    }
  }

  private countWords(text: string): void {
    const words = text.split(/\s+/).filter((word) => word.trim() !== '');
    this.wordCount = words.length;
    this.wordFrequencies = this.getWordFrequencies(words);
    this.uniqueWords = Object.keys(this.wordFrequencies);
  }

  private getWordFrequencies(words: string[]): { [word: string]: number } {
    const frequencies: { [word: string]: number } = {};
    for (const word of words) {
      frequencies[word] = frequencies[word] ? frequencies[word] + 1 : 1;
    }
    return frequencies;
  }
}
