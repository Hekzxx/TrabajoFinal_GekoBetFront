import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { MatchComponent } from './components/match/match.component';
import { UserComponent } from './components/user/user.component';
import { InsertarcountryComponent } from './components/country/insertarcountry/insertarcountry.component';
import { InsertarmatchComponent } from './components/match/insertarmatch/insertarmatch.component';
import { InsertaruserComponent } from './components/user/insertaruser/insertaruser.component';

export const routes: Routes = [
    {
        path: 'listarcountry', component: CountryComponent,
        children: [
            {
                path: 'insertarcountry', component: InsertarcountryComponent,
            }
        ]
    },
    {
        path: 'listarmatch', component: MatchComponent,
        children: [
            {
                path: 'insertarmatch', component: InsertarmatchComponent,
            }
        ]
    },
    {
        path: 'listaruser', component: UserComponent,
        children: [
            {
                path: 'insertaruser', component: InsertaruserComponent,
            }
        ]
    }
];
