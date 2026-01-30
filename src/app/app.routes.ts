import { Routes } from '@angular/router';
import { Mainbody } from './shared/components/mainbody/mainbody';
import { Imprint } from './imprint/imprint';
import { PrivacyPolicy } from './shared/components/privacy-policy/privacy-policy';

export const routes: Routes = [
  { path: "", component: Mainbody },
  { path: "imprint", component: Imprint},
  { path: "privacy-policy", component: PrivacyPolicy}
];
