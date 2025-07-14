import { Contract } from "./contract.enum";
import { Team } from "./team.enum";

export type User = {
    id: string;
    lastname: string;
    firstname: string;
    email: string;
    city: string;
    image_profile: string;
    team: Team;
    contract: Contract;
    fc_id: string;
    to_convey: boolean;
    is_available: boolean;
    announcement_id: string;
};
