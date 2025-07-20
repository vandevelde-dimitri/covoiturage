import { getAllAnnouncementsWithUser } from "@/api/announcement/getAllAnnouncementWithUser";
import { getAnnouncementByidWithUser } from "@/api/announcement/getAnnouncementByIdWithUser";
import { getAnnouncementByUserId } from "@/api/announcement/getAnnouncementByUserId";
import { useQuery } from "@tanstack/react-query";

export function useAnnoncesWithUserWithUser() {
    return useQuery({
        queryKey: ["annonces"],
        queryFn: getAllAnnouncementsWithUser,
    });
}

export function useAnnouncementByIdWithUser(id: string) {
    return useQuery({
        queryKey: ["annonce", id],
        queryFn: () => getAnnouncementByidWithUser(id),
        enabled: !!id, // Only run the query if id is defined
    });
}

export function useAnnouncementByUserId(userId: string) {
    return useQuery({
        queryKey: ["annonce", userId],
        queryFn: () => getAnnouncementByUserId(userId),
        enabled: !!userId, // Only run the query if userId is defined
    });
}
