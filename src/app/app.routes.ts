import { Routes } from '@angular/router';
import { Mainbody } from './shared/components/mainbody/mainbody';
import { Imprint } from './imprint/imprint';

export const routes: Routes = [
  { path: "", component: Mainbody },
  { path: "imprint", component: Imprint}
];
