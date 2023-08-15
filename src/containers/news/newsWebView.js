import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import WHeader from '../../components/common/WHeader';
import { colors, styles } from '../../themes';
import { StackNavStrings } from '../../navigation/NavigationKeys';

const NewsWebView = ({ route}) => {
    const { item={} } = route.params;
    const{url}=item
    const onPressBack = () => {
        // navigation.goBack();
        navigation.navigate(StackNavStrings.News);
      };
    return (
        
        <SafeAreaView style={styles.mainContainer}>
         <WHeader  settingIcon={false} backIcon={true} onPress={onPressBack} />
            <WebView source={{uri: url}} />
        </SafeAreaView>
    );
}

export default NewsWebView;