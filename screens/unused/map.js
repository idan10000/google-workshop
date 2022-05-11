import { StyleSheet, View, ImageBackground } from 'react-native';
import NewReportFAB from '../../shared_components/unused/newReportFAB';



export default function Map() {
    return (
        <View>
            <ImageBackground
                style={styles.image}
                source={require('../../assets/map.png')}>
                    {/* <NewReportFAB/> */}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
  })