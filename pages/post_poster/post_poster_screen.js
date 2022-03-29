import * as React from 'react';
import {Modal, Portal, Text, Button, Provider, Card, Chip} from 'react-native-paper';
import {View, StyleSheet, } from 'react-native'


const MyComponent = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const chipPressHandler = (index) => {
        toggleState(prevStates => {
            var temp = [...prevStates]
            temp[index].state = !temp[index].state
            return temp
        });
    }

    const tagList = [
        {tag: "Shy", state: false},
        {tag: "Friendly", state: false},
        {tag: "Aggressive", state: false}]

    const [tags, toggleState] = React.useState(tagList);
    return (
        <Provider>
            {/*Modal (pop up screen) for selecting the tags describing the dog*/}
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <View style={styles.chips}>
                        {
                            tags.map((item, index) => (
                                <Chip key={index} icon="information" selected={tags[index].state}
                                      onPress={() => chipPressHandler(index)}>{item.tag}</Chip>
                            ))
                        }
                    </View>
                </Modal>
            </Portal>

            <Card>
                <Card.Cover
                    source={{ uri: 'https://picsum.photos/700' }}/>
            </Card>

            <Button style={{marginTop: 30}} onPress={showModal}>
                Add tags
            </Button>
            <Button mode={"contained"}>
                Submit
            </Button>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 4,

    },
    stretch: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderColor: 'red',
        borderWidth: 5,
        resizeMode: 'contain',
    },
    chips: {
        flexDirection: 'row',
        overflow: "hidden",
        flexWrap: "wrap"
    },
    modal: {
        backgroundColor: 'white',
        padding: 20
    }
});

export default MyComponent;
