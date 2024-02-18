import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';
import { WordCounterComponent } from './shared/components/word-counter/word-counter.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [FileLoaderComponent, WordCounterComponent, AppComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
