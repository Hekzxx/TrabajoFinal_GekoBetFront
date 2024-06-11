import { Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { MatchComponent } from './components/match/match.component';
import { UserComponent } from './components/user/user.component';
import { InsertarcountryComponent } from './components/country/insertarcountry/insertarcountry.component';
import { InsertarmatchComponent } from './components/match/insertarmatch/insertarmatch.component';
import { InsertaruserComponent } from './components/user/insertaruser/insertaruser.component';
import { SeasonComponent } from './components/season/season.component';
import { InsertarseasonComponent } from './components/season/insertarseason/insertarseason.component';
import { LigueComponent } from './components/ligue/ligue.component';
import { InsertarligueComponent } from './components/ligue/insertarligue/insertarligue.component';
import { TeamComponent } from './components/team/team.component';
import { InsertarteamComponent } from './components/team/insertarteam/insertarteam.component';
import { RecordComponent } from './components/record/record.component';
import { InsertarrecordComponent } from './components/record/insertarrecord/insertarrecord.component';
import { TeamXMatchComponent } from './components/team-xmatch/team-xmatch.component';
import { InsertarteamXmatchComponent } from './components/team-xmatch/insertarteam-xmatch/insertarteam-xmatch.component';
import { RoleComponent } from './components/role/role.component';
import { InsertarroleComponent } from './components/role/insertarrole/insertarrole.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { InsertarfavoriteComponent } from './components/favorite/insertarfavorite/insertarfavorite.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { InsertarticketComponent } from './components/ticket/insertarticket/insertarticket.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';

export const routes: Routes = [
    //Login
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    //Home
    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },

    //Country
    {
        path: 'listarcountry', component: CountryComponent,
        children: [
            { path: 'insertarcountry', component: InsertarcountryComponent},
            { path: 'ediciones/:id', component: InsertarcountryComponent},
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //Season
    {
        path: 'listarseason', component: SeasonComponent,
        children: [
            { path: 'insertarseason', component: InsertarseasonComponent},
            { path: 'ediciones/:id', component: InsertarseasonComponent},
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //Ligue
    {
        path: 'listarligue', component: LigueComponent,
        children: [
            { path: 'insertarligue', component: InsertarligueComponent},
            { path: 'ediciones/:id', component: InsertarligueComponent},
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //team
    {
        path: 'listarteam', component: TeamComponent,
        children: [
            { path: 'insertarteam', component: InsertarteamComponent},
            { path: 'ediciones/:id', component: InsertarteamComponent},
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //record
    {
        path: 'listarrecord', component: RecordComponent,
        children: [
            { path: 'insertarrecord', component: InsertarrecordComponent},
            { path: 'ediciones/:id', component: InsertarrecordComponent},
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //match
    {
        path: 'listarmatch', component: MatchComponent,
        children: [
            { path: 'insertarmatch', component: InsertarmatchComponent },
            { path: 'ediciones/:id', component: InsertarmatchComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //teamsxmatches
    {
        path: 'listarteamsxmatches', component: TeamXMatchComponent,
        children: [
            { path: 'insertarteamsxmatches', component: InsertarteamXmatchComponent },
            { path: 'ediciones/:id', component: InsertarteamXmatchComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //usuario
    {
        path: 'listaruser', component: UserComponent,
        children: [
            { path: 'insertaruser', component: InsertaruserComponent },
            { path: 'ediciones/:id', component: InsertaruserComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //role
    {
        path: 'listarrole', component: RoleComponent,
        children: [
            { path: 'insertarrole', component: InsertarroleComponent },
            { path: 'ediciones/:id', component: InsertarroleComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //favorite
    {
        path: 'listarfavorite', component: FavoriteComponent,
        children: [
            { path: 'insertarfavorite', component: InsertarfavoriteComponent },
            { path: 'ediciones/:id', component: InsertarfavoriteComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    //ticket
    {
        path: 'listarticket', component: TicketComponent,
        children: [
            { path: 'insertarticket', component: InsertarticketComponent },
            { path: 'ediciones/:id', component: InsertarticketComponent },
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
];
