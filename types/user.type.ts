import { Contract } from "./contract.enum";
import { Team } from "./team.enum";

export interface User {
    id: string;
    lastname: string;
    firstname: string;
    team: Team;
    city: string;
    contract: Contract;
    to_convey: boolean;
    is_available: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
