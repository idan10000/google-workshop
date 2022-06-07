import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    ImageBackground,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { Title, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Nofar_styles } from "../../styles/NofarStyle";
import { getAuth, signOut } from "firebase/auth";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
// import { turnOffNotifications } from "../../shared_components/NotificationsUtils";
import {
    getPhoneNumber,
    updatePhoneNumber,
} from "../../shared_components/Firebase.js";
import { getInitialData } from "../BrowsePage/InfiniteScroll";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import PostPofileItem from "./PostPofileItem";
import { turnOffNotifications } from "../../shared_components/NotificationsUtils";

export default function SecondProfile({ navigation }) {
    const { user } = useContext(AuthenticatedUserContext);
    const Name = user.displayName;
    const Email = user.email;
    const [Phone, setPhone] = useState();
    const [data, setData] = useState([]);

    var FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    const pressHandler_supp = () => {
        navigation.navigate("SupportScreen");
    };

    const getPosters = () => {
        const db = getFirestore();
        const posters = [];
        console.log("POSTERS", posters);
        getDoc(doc(db, "Users", user.uid)).then((userRef) => {
            const data = userRef.data(); // USER'S DATA
            const refs = data.posters;
            const promises = [];
            refs.forEach((ref) => {
                promises.push(getDoc(doc(db, "Posters", ref)));
            });
            Promise.all(promises).then((docs) => {
                docs.forEach((doc) => {
                    posters.push(doc.data());
                });
                setData(posters);
            });
        });
    };

    useEffect(async () => {
        await getPhoneNumber(user, setPhone);
        await getPosters();
    }, []);

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require("./new_background.png")}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/*<View>*/}
                {/*    <View style={{ flexDirection: "row", marginLeft: "10%" }}>*/}
                {/*        <View style={{ marginTop: 30, marginRight: 10 }}>*/}
                {/*            <Title style={Nofar_styles.BigTitle}>{Name} </Title>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <View*/}
                {/*        style={{ flexDirection: "row", marginLeft: "10%", marginTop: "2%" }}*/}
                {/*    >*/}
                {/*        <Icon name="email" color="#000000" size={30} />*/}
                {/*        <Text style={{ color: "#000000", marginLeft: 20, fontSize: 17 }}>*/}
                {/*            {Email}*/}
                {/*        </Text>*/}
                {/*    </View>*/}

                {/*    <View*/}
                {/*        style={{*/}
                {/*            flexDirection: "row",*/}
                {/*            marginLeft: "10%",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <Icon name="phone" color="#000000" size={30} />*/}
                {/*        <TextInput*/}
                {/*            style={{*/}
                {/*                color: "#000000",*/}
                {/*                marginLeft: 20,*/}
                {/*                fontSize: 17,*/}
                {/*                textDecorationLine: "underline",*/}
                {/*            }}*/}
                {/*            onChangeText={(newText) => {*/}
                {/*                setPhone(newText);*/}
                {/*                updatePhoneNumber(user, newText);*/}
                {/*            }}*/}
                {/*            defaultValue={Phone}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*</View>*/}

                {/*<View*/}
                {/*    style={{*/}
                {/*        flexDirection: "row",*/}
                {/*        paddingHorizontal: 10,*/}
                {/*        marginTop: "1%",*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.MidButton}*/}
                {/*        onPress={pressHandler_supp}*/}
                {/*    >*/}
                {/*        <View*/}
                {/*            justifyContent="center"*/}
                {/*            alignItems="center"*/}
                {/*            flexDirection="row"*/}
                {/*            marginRight="4%"*/}
                {/*        >*/}
                {/*            <Icon name="pen" size={24} color="#FFFFFF" />*/}
                {/*        </View>*/}
                {/*        <Text style={styles.MidButtonTitle}>תמיכה טכנית</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*    <TouchableOpacity*/}
                {/*        style={styles.MidButton}*/}
                {/*        onPress={async () => {*/}
                {/*            signOut(getAuth()).then(() => {});*/}
                {/*            await turnOffNotifications(user);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <View*/}
                {/*            justifyContent="center"*/}
                {/*            alignItems="center"*/}
                {/*            flexDirection="row"*/}
                {/*            marginRight="4%"*/}
                {/*        >*/}
                {/*            <Icon name="cancel" size={24} color="#FFFFFF" />*/}
                {/*        </View>*/}
                {/*        <Text style={styles.MidButtonTitle}>התנתקות</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}

                <View style={styles.listContainer}>
                    <Title style={styles.foundDog}>המודעות שלי</Title>
                    <FlatList
                        data={data}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        keyExtractor={(item) => item.image}
                        numColumns={1}
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={{
                                        paddingVertical: 5,
                                    }}
                                >
                                    <PostPofileItem
                                        image={item.image}
                                        date={item.date}
                                        name={item.dogName}
                                        address={item.address}
                                        description={item.description}
                                        data={item}
                                        navigation={navigation}
                                        destination={"Poster"}
                                    />
                                </View>
                            );
                        }}
                    />
                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    foundDog: {
        fontWeight: "700",
        marginLeft: "7.5%",
        lineHeight: 35,
        color: "#9E6C6C",
        fontSize: 24,
        textDecorationLine: "underline",
    },
    MidButtonTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "500",
    },
    MidButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 6,
        width: "45%",
        height: "60%",
        marginLeft: "2%",
        marginBottom: "7%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 11.111,
        backgroundColor: "#DCA277",
    },
    listContainer: {
        flex: 1,
    },
});
