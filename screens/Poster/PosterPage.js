import React from "react";
import {Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, StyleSheet, Dimensions,Linking} from "react-native";
import {Nofar_styles} from "../../styles/NofarStyle";

import {AR_styles} from "./PosterStyle";
import {Chip} from "react-native-paper";
import Icon from "react-native-vector-icons/Entypo";

export default function PosterPage({navigation, route, typeOfPage}) {
    console.log("5555555522222");

    const makeCall = () => {
        console.log("Its calling");
        let phoneNumber = route.params.data.phoneNumber;
        console.log(route.params.data.phoneNumber)
        Linking.openURL(`tel:${phoneNumber}`)
    };
    const editButtonPressHandler = () => {

        navigation.navigate("PosterCreation2", {
            poster: route.params.data,
            edit: true,
            ref: route.params.ref
        });
    };
    const [expanded, setExpanded] = React.useState(false);

    // let dotText = ""
    // if(!report){
    //     dotText = "·";
    // }
    if (typeOfPage === "ReportForBrowse") {
        return (
            <View style={Nofar_styles.container}>

                <ScrollView style={AR_styles.content}>

                    <View>
                        <View>
                            <View style={{alignSelf: "center"}}>

                                <Image
                                    style={Nofar_styles.mainImage}
                                    source={{uri: route.params.data.image}}/>
                                <View style={styles.textOnComponent}>

                                    <View style={styles.centerVerticalDot}>
                                        <Text style={styles.dogsName2}>{route.params.data.date}</Text></View>
                                </View>
                            </View>

                        </View>
                        { route.params.data.address.length < 15 &&
                        <View
                            marginVertical="4%">
                            <View style={AR_styles.lastSeen}>

                                <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
                                <Icon name="location-pin" size={22} color="#000"/>
                                <TouchableOpacity ><Text fontSize="16" lineHeight="20" fontWeight="500"
                                                        textAlign="center">{route.params.data.address}</Text></TouchableOpacity>
                            </View>

                        </View>}
                        { route.params.data.address.length >= 15 &&
                            <View
                                marginVertical="4%" flexDirection= "column">
                                <View style={AR_styles.lastSeen}>

                                    <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
                                    <Icon name="location-pin" size={22} color="#000"/>
                                    <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight="500"
                                                            textAlign="center">{route.params.data.address}</Text></TouchableOpacity>
                                </View>

                            </View>}
                        {
                            !expanded &&
                            <View style={{...Nofar_styles.Viewchips}}>
                                <View style={styles.containerChips}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}

                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>
                                <View style={styles.chveron2}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-down" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>

                            </View>}

                        {

                            expanded &&

                            <View style={{...styles.chipsColumn, marginLeft: "2%"}}>
                                <View style={{...styles.chips, marginLeft: "2%"}}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}
                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>

                                <View style={styles.chveron1}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-up" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>
                            </View>
                        }

                        {/*<View marginTop="3%" ><Text style = {styles.descriptionText}>תיאור</Text></View>*/}


                        <View style={AR_styles.myCard}>
                            <View style={AR_styles.cardHeader}>
                                {route.params.data.description.length === 0 &&
                                    <Text style={styles.noDescription}>אין תיאור</Text>

                                }
                                <Text>{route.params.data.description}</Text>
                            </View>
                        </View>

                        <View style={AR_styles.ownerData}>

                            <Text style={styles.whenText}>המדווח: {route.params.data.name}</Text>
                            {route.params.data.contact &&
                                <View style={AR_styles.verticalLine}/>}
                            {route.params.data.contact &&

                                <TouchableOpacity
                                    onPress={makeCall}
                                    style={AR_styles.contact}>
                                    <Text style={AR_styles.contactTitle}>צור קשר</Text>

                                </TouchableOpacity>}
                        </View>
                        {/*<View style={styles.dogOwner}>*/}
                        {/*    <Text style={styles.descriptionText} >בעל הכלב:</Text>*/}
                        {/*</View>*/}
                        <View style={AR_styles.confirmBTContainer}>
                            <TouchableOpacity
                                style={Nofar_styles.BigButton}
                                onPress={() => {
                                }}
                            >
                                <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    } else if (typeOfPage === "PosterForBrowse") {
        return (
            <View style={Nofar_styles.container}>

                <ScrollView style={AR_styles.content}>

                    <View>
                        <View>
                            <View style={{alignSelf: "center"}}>

                                <Image
                                    style={Nofar_styles.mainImage}
                                    source={{uri: route.params.data.image}}/>

                                <View style={styles.textOnComponent}>
                                    <View style={styles.centerVertical}>
                                        <Text style={styles.dogsName}>{route.params.data.dogName}</Text></View>
                                    <View style={styles.centerVertical}>
                                        <Text style={styles.dotName}>·</Text></View>
                                    <View style={styles.centerVerticalDot}>
                                        <Text style={styles.dogsName2}>{route.params.data.date}</Text></View>
                                </View>
                            </View>

                        </View>
                        <View
                            marginVertical="4%">
                            <View style={AR_styles.lastSeen}>

                                <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
                                <Icon name="location-pin" size={22} color="#000"/>
                                <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight="500"
                                                        textAlign="center">{route.params.data.address}</Text></TouchableOpacity>
                            </View>


                            {/*} <Text style = {styles.whenText}>בתאריך: {route.params.data.date}</Text>*/}

                        </View>
                        {
                            !expanded &&
                            <View style={{...Nofar_styles.Viewchips}}>
                                <View style={styles.containerChips}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}

                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>
                                <View style={styles.chveron2}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-down" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>

                            </View>}

                        {

                            expanded &&

                            <View style={{...styles.chipsColumn, marginLeft: "2%"}}>
                                <View style={{...styles.chips, marginLeft: "2%"}}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}
                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>

                                <View style={styles.chveron1}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-up" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>
                            </View>
                        }

                        {/*<View marginTop="3%" ><Text style = {styles.descriptionText}>תיאור</Text></View>*/}


                        <View style={AR_styles.myCard}>
                            <View style={AR_styles.cardHeader}>
                                {route.params.data.description.length == 0 &&
                                    <Text style={styles.noDescription}>אין תיאור</Text>

                                }
                                <Text>{route.params.data.description}</Text>
                            </View>
                        </View>

                        <View style={AR_styles.ownerData}>

                            <Text style={styles.whenText}>הבעלים: {route.params.data.name}</Text>
                            <View style={AR_styles.verticalLine}></View>
                            <TouchableOpacity
                                onPress={makeCall}
                                style={AR_styles.contact}>
                                <Text style={AR_styles.contactTitle}>צור קשר</Text>

                            </TouchableOpacity>
                        </View>
                        {/*<View style={styles.dogOwner}>*/}
                        {/*    <Text style={styles.descriptionText} >בעל הכלב:</Text>*/}
                        {/*</View>*/}
                        <View style={AR_styles.confirmBTContainer}>
                            <TouchableOpacity
                                style={Nofar_styles.BigButton}
                                onPress={() => {
                                }}
                            >
                                <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    } else if (typeOfPage === "report") {
        return (
            <View style={Nofar_styles.container}>

                <ScrollView style={AR_styles.content}>

                    <View>
                        <View>
                            <View style={{alignSelf: "center"}}>

                                <Image
                                    style={Nofar_styles.mainImage}
                                    source={{uri: route.params.data.image}}/>

                                <View style={styles.textOnComponent}>

                                    <View style={styles.centerVerticalDot}>
                                        <Text style={styles.dogsName2}>{route.params.data.date}</Text></View>
                                </View>
                            </View>

                        </View>
                        <View
                            marginVertical="4%">
                            <View style={AR_styles.lastSeen}>

                                <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
                                <Icon name="location-pin" size={22} color="#000"/>
                                <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight="500"
                                                        textAlign="center">{route.params.data.address}</Text></TouchableOpacity>
                            </View>


                        </View>
                        {
                            !expanded &&
                            <View style={{...Nofar_styles.Viewchips}}>
                                <View style={styles.containerChips}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}

                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>
                                <View style={styles.chveron2}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-down" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>

                            </View>}

                        {

                            expanded &&

                            <View style={{...styles.chipsColumn, marginLeft: "2%"}}>
                                <View style={{...styles.chips, marginLeft: "2%"}}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}
                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>

                                <View style={styles.chveron1}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-up" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>
                            </View>
                        }


                        {/*<View marginTop="3%" ><Text style = {styles.descriptionText}>תיאור</Text></View>*/}


                        <View style={AR_styles.myCard}>
                            <View style={AR_styles.cardHeader}>
                                {route.params.data.description.length === 0 &&
                                    <Text style={styles.noDescription}>אין תיאור</Text>

                                }
                                <Text>{route.params.data.description}</Text>
                            </View>
                        </View>

                        <View style={AR_styles.ownerData}>

                            <Text style={styles.whenText}>המדווח: {route.params.data.name}</Text>
                            {route.params.data.contact &&
                                <View style={AR_styles.verticalLine}>

                                </View>}
                            {route.params.data.contact &&
                                <TouchableOpacity
                                    onPress={makeCall}
                                    style={AR_styles.contact}>
                                    <Text style={AR_styles.contactTitle}>צור קשר</Text>

                                </TouchableOpacity>}
                        </View>
                        {/*<View style={styles.dogOwner}>*/}
                        {/*    <Text style={styles.descriptionText} >בעל הכלב:</Text>*/}
                        {/*</View>*/}
                        <View style={AR_styles.confirmBTContainer}>
                            <TouchableOpacity
                                style={Nofar_styles.BigButton}
                                onPress={() => {
                                }}
                            >
                                <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    } else {
        return (
            <View style={Nofar_styles.container}>

                <ScrollView style={AR_styles.content}>

                    <View>
                        <View>
                            <View style={{alignSelf: "center"}}>

                                <Image
    style={Nofar_styles.mainImage}
    source={{uri: route.params.data.image}}/>

                                <View style={styles.textOnComponent}>
                                    <View style={styles.centerVertical}>
                                        <Text style={styles.dogsName}>{route.params.data.dogName}</Text></View>
                                    <View style={styles.centerVertical}>
                                        <Text style={styles.dotName}>·</Text></View>
                                    <View style={styles.centerVerticalDot}>
                                        <Text style={styles.dogsName2}>{route.params.data.date}</Text></View>
                                </View>
                            </View>

                        </View>
                        <View
                            marginVertical="4%">
                            <View style={AR_styles.lastSeen}>

                                <Text style={styles.whenText}>נצפה לאחרונה ב:</Text>
                                <Icon name="location-pin" size={22} color="#000"/>
                                <TouchableOpacity><Text fontSize="16" lineHeight="20" fontWeight="500"
                                                        textAlign="center">{route.params.data.address}</Text></TouchableOpacity>
                            </View>


                            {/*} <Text style = {styles.whenText}>בתאריך: {route.params.data.date}</Text>*/}

                        </View>
                        {
                            !expanded &&
                            <View style={{...Nofar_styles.Viewchips}}>
                                <View style={styles.containerChips}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}

                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>
                                <View style={styles.chveron2}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-down" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>

                            </View>}

                        {

                            expanded &&

                            <View style={{...styles.chipsColumn, marginLeft: "2%"}}>
                                <View style={{...styles.chips, marginLeft: "2%"}}>

                                    {route.params.data.tagList.map((item, index) => (

                                        <Chip
                                            key={index}
                                            selected={false}
                                            style={Nofar_styles.chips}
                                        >
                                            {item}
                                        </Chip>
                                    ))}
                                    {route.params.data.tagList.length === 0 &&

                                        <View justifyContent="center" alignSelf="center" alignItems="center"
                                              marginHorizontal="5%">

                                            <Text style={styles.newText}>אין תגיות</Text></View>

                                    }
                                </View>

                                <View style={styles.chveron1}>
                                    {
                                        route.params.data.tagList.length !== 0 &&
                                        <TouchableOpacity>
                                            <Icon name="chevron-up" size={32} color="#000"
                                                  onPress={() => {
                                                      setExpanded(!expanded);
                                                  }}>
                                            </Icon></TouchableOpacity>}
                                </View>
                            </View>
                        }

                        {/*<View marginTop="3%" ><Text style = {styles.descriptionText}>תיאור</Text></View>*/}


                        <View style={AR_styles.myCard}>
                            <View style={AR_styles.cardHeader}>
                                {route.params.data.description.length === 0 &&
                                    <Text style={styles.noDescription}>אין תיאור</Text>

                                }
                                <Text>{route.params.data.description}</Text>
                            </View>
                        </View>

                        <View style={AR_styles.ownerData}>

                            <Text style={styles.whenText}>הבעלים: {route.params.data.name}</Text>
                            <View style={AR_styles.verticalLine}/>
                            <TouchableOpacity
                                onPress={makeCall}
                                style={AR_styles.contact}>
                                <Text style={AR_styles.contactTitle}>צור קשר</Text>

                            </TouchableOpacity>
                        </View>
                        {/*<View style={styles.dogOwner}>*/}
                        {/*    <Text style={styles.descriptionText} >בעל הכלב:</Text>*/}
                        {/*</View>*/}
                        <View style={AR_styles.confirmBTContainer}>
                            <TouchableOpacity
                                style={Nofar_styles.BigButton}
                                onPress={() => {
                                }}
                            >
                                <Text style={Nofar_styles.BigButtonText}>פתח מיקום במפה</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AR_styles.confirmBTContainer}>
                            <TouchableOpacity
                                style={Nofar_styles.BigButton}
                                onPress={editButtonPressHandler}
                            >
                                <Text style={Nofar_styles.BigButtonText}>עדכן את הדיווח</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    descriptionText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "700",
    },
    whenText: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "500",
        alignSelf: "center",
    },

    textOnComponent: {
        justifyContent: "center",
        flexDirection: "row",
        position: "absolute",
        backgroundColor: 'rgba(00, 00, 00, 0.6)',
        width: Dimensions.get("window").width / 1.2,
        height: Dimensions.get("window").height / 16,
        marginTop: Dimensions.get("window").height / 2.2 - Dimensions.get("window").height / 16,
        borderRadius: 2,
    },
    dogsName: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    dogsName2: {
        fontSize: 16,
        color: "#FFFFFF",
    },
    dotName: {
        fontSize: 32,
        color: "#FFFFFF",
    },
    centerVertical: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        marginHorizontal: "4%",

    },
    centerVerticalDot: {
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        marginHorizontal: "4%",

    },
    containerChips: {
        width: Dimensions.get("window").width / 1.2,
        alignSelf: "center",
        borderRadius: 20,

        backgroundColor: "#DCA277",
        flexDirection: "row",
        marginBottom: "3%"
    },
    dogOwner: {
        marginHorizontal: "3%",
    },
    newText: {
        fontSize: 16,
        color: "#FFFFFF",
        // fontWeight:"bold"
    },
    noDescription: {
        fontSize: 16,
        // fontWeight:"bold"
    },
    chips: {

        backgroundColor: "#DCA277",
        flexDirection: "row",
        overflow: "hidden",
        flexWrap: "wrap",
        paddingHorizontal: "1%",
        width: Dimensions.get("window").width / 1.2,
        alignSelf: "center",
        borderRadius: 20,


    },
    chipsColumn: {
        paddingTop: "1%",
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 100,
        elevation: 8,
        backgroundColor: "#DCA277",
        flexDirection: "column",
        overflow: "hidden",
        flexWrap: "wrap",
        paddingHorizontal: "1%",
        width: Dimensions.get("window").width / 1.2,
        alignSelf: "center",
        borderRadius: 12,


        marginBottom: "3%"
    }, chveron1: {
        // alignSelf: "center",
        // alignItems: "center",
        // justifyContent:"center",
        marginRight: "52%",
        // marginLeft:"45%"

    },
    chveron2: {
        // alignSelf: "center",
        // alignItems: "center",
        // justifyContent:"center",
        // marginRight:"45%",
        marginLeft: "42%"
    }


});


