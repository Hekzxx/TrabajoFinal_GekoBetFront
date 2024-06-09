import { Team } from './Team';
import { User } from './User';

export class Favorite {
    id: number = 0
    user: User = new User();
    team: Team = new Team();
}