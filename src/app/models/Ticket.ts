import { User } from "./User";
import { Match } from "./Match";

export class Ticket {
    id: number = 0
    probabilidad: number = 0
    equipoGanador: string = ""
    user: User = new User
    match: Match = new Match
}