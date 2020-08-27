import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakemakerComponent} from './cakemaker.component';


const routes: Routes = [{
  path: '', component: CakemakerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CakemakerRoutingModule { }
