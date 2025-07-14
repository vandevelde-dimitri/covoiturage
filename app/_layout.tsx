// app/_layout.tsx
import { AuthProvider, useAuth } from "@/hooks/authContext";
import { Slot, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

function InitialLayout() {
    const { session, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    useEffect(() => {
        if (!loading) {
            if (!session && !inAuthGroup) {
                router.replace("/signin");
            }

            if (session && inAuthGroup) {
                router.replace("/home");
            }
        }
    }, [session, loading]);

    if (loading) return null;

    return <Slot />;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>
    );
}
