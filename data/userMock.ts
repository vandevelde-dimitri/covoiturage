import { Contract } from "@/types/contract.enum";
import { Team } from "@/types/team.enum";
import { User } from "@/types/user.type";

export const users: User[] = [
    {
        id: "1",
        lastname: "Doe",
        firstname: "John",
        email: "john@doe.fr",
        city: "Paris",
        image_profile:
            "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        team: Team.I1,
        contract: Contract.CDI,
        fc_id: "1",
        to_convey: false,
        is_available: true,
        announcement_id: "1",
    },
    {
        id: "2",
        lastname: "Dupont",
        firstname: "Marie",
        email: "marie.dupont@email.fr",
        city: "Lyon",
        image_profile:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        team: Team.I2,
        contract: Contract.INTERIM,
        fc_id: "2",
        to_convey: true,
        is_available: false,
        announcement_id: "2",
    },
    {
        id: "3",
        lastname: "Martin",
        firstname: "Paul",
        email: "paul.martin@email.fr",
        city: "Marseille",
        image_profile:
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        team: Team.I3,
        contract: Contract.CDI,
        fc_id: "3",
        to_convey: false,
        is_available: true,
        announcement_id: "3",
    },
    {
        id: "4",
        lastname: "Bernard",
        firstname: "Sophie",
        email: "sophie.bernard@email.fr",
        city: "Toulouse",
        image_profile:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        team: Team.SD,
        contract: Contract.CDI,
        fc_id: "4",
        to_convey: true,
        is_available: true,
        announcement_id: "4",
    },
    {
        id: "5",
        lastname: "Petit",
        firstname: "Lucas",
        email: "lucas.petit@email.fr",
        city: "Nice",
        image_profile:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
        team: Team.O2,
        contract: Contract.CDI,
        fc_id: "5",
        to_convey: false,
        is_available: false,
        announcement_id: "5",
    },
];
