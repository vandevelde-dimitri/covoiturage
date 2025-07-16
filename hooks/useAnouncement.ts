import { getAllAnnouncements } from "@/api/announcement/getAllAnnouncement";
import { getAnnouncementByid } from "@/api/announcement/getAnnouncementById";
import { useQuery } from "@tanstack/react-query";

export function useAnnoncesWithUser() {
    return useQuery({
        queryKey: ["annonces"],
        queryFn: getAllAnnouncements,
    });
}

export function useAnnouncementById(id: string) {
    return useQuery({
        queryKey: ["annonce", id],
        queryFn: () => getAnnouncementByid(id),
        enabled: !!id, // Only run the query if id is defined
    });
}
