import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { colors, styles } from '../../themes';
import WHeader from '../../components/common/WHeader';

const Webview = ({ route, navigation }) => {
    const { url } = route.params;
    console.log(url, 'url')
    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <WHeader  
            
            close/>
            <WebView 
            containerStyle={{marginHorizontal:10,marginVertical:10}}
            source={{uri: url}} />
        </SafeAreaView>
    );
}

export default Webview;