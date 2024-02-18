import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';

const routes: Routes = [
  {
    path: 'file-loader',
    component: FileLoaderComponent,
  },

  {
    path: '',
    redirectTo: '/file-loader',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/file-loader',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
