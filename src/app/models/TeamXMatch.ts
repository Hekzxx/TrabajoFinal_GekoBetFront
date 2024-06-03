import { Team } from "./Team";
import { Match } from "./Match";

export class TeamXMatch{
    id:number=0
    team:Array<Team>=new Array<Team>();
    match:Array<Match>=new Array<Match>();
}