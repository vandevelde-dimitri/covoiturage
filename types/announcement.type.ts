import { User } from "./user.type";

export type Announcement = {
    id: string;
    title: string;
    content: string;
    user_id: string;
};

export type AnnouncementWithUser = Announcement & {
    users: User;
};
