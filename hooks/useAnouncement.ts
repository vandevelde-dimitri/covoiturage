import { getAllAnnouncementsWithUser } from "@/api/announcement/getAllAnnouncementWithUser";
import { getAnnouncementByidWithUser } from "@/api/announcement/getAnnouncementByIdWithUser";
import { getAnnouncementByUserId } from "@/api/announcement/getAnnouncementByUserId";
import { getPublishedAnnouncementsByUser } from "@/api/announcement/getPublishedAnnouncementsByUser";
import { getFavoriteUser } from "@/api/users/getFavoriteUser";
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

export function usePublishAnnouncement(userId: string) {
    return useQuery({
        queryKey: ["annonces", userId],
        queryFn: () => getPublishedAnnouncementsByUser(userId),
        enabled: !!userId, // Only run the query if userId is defined
    });
}

export function useFavoriteUser(userId: string) {
    return useQuery({
        queryKey: ["favoriteUser", userId],
        queryFn: () => getFavoriteUser(userId),
        enabled: !!userId, // Only run the query if userId is defined
    });
}
