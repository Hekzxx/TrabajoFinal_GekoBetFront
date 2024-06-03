import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { MatchComponent } from './components/match/match.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path:'listarcountry', component:CountryComponent,
    },
    {
        path:'listarmatch', component:MatchComponent,
    },
    {
        path:'listaruser',component:UserComponent,
    }
];
