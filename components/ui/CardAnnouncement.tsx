import { users } from "@/data/userMock";
import { profileStyles } from "@/styles/profile.styles";
import { Announcement } from "@/types/announcement.type";
import FeatherIcon from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CardAnnouncement({ item }: { item: Announcement }) {
    const { id, user_id } = item;
    return (
        <TouchableOpacity
            key={id}
            onPress={() => {
                router.push({
                    pathname: "/(tabs)/home/announcement/[id]",
                    params: { id },
                });
            }}
            style={profileStyles.profile}
        >
            <Image
                alt=""
                source={{
                    uri: users.find((u) => u.id === user_id)?.image_profile,
                }}
                style={profileStyles.profileAvatar}
            />

            <View style={profileStyles.profileBody}>
                <Text style={profileStyles.profileName}>
                    {users.find((u) => u.id === user_id)?.firstname}{" "}
                    {users.find((u) => u.id === user_id)?.lastname}
                    {` (${users.find((u) => u.id === user_id)?.team})`}
                </Text>

                <Text style={profileStyles.profileHandle}>
                    {users.find((u) => u.id === user_id)?.city}
                </Text>
            </View>

            <FeatherIcon color="#bcbcbc" name="chevron-right" size={22} />
        </TouchableOpacity>
    );
}
