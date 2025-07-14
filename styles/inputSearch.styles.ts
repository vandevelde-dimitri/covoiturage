import { StyleSheet } from "react-native";

export const inputSearchStyles = StyleSheet.create({
    search: {
        position: "relative",
        backgroundColor: "#efefef",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    searchWrapper: {
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: "#efefef",
    },
    searchIcon: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: 34,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    searchControl: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        paddingLeft: 34,
        width: "100%",
        fontSize: 16,
        fontWeight: "500",
    },
    searchContent: {
        paddingLeft: 24,
    },
    searchEmpty: {
        textAlign: "center",
        paddingTop: 16,
        fontWeight: "500",
        fontSize: 15,
        color: "#9ca1ac",
    },
});
