import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, Linking, View, StyleSheet, Modal, Image, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import image from '../../assets/images'
import WButtonText from '../../components/common/WButtonText';
import { colors, styles } from '../../themes';
import {
    ACCESS_TOKENS,
    getHeight,
    getWidth,
    moderateScale,
    USER,
} from '../../common/constants';
import Typography from '../../themes/typography';
import { CHECK_VERSION } from '../../common/apiconstants';

const AppUpdatePopup = () => {
    const [versionData, setVersionData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isForceUpdate, setForceUpdate] = useState('false')

    const version = (data) => {
        // const version = DeviceInfo.getVersion();
        // const buildNumber = DeviceInfo.getBuildNumber();
        setForceUpdate(data.forceupdate)
        if (data.update == '1') {//`${version}.${buildNumber}`
            console.log('hello please update')
            setModalVisible(!modalVisible)
        }
    }

    const getVersionNumber = async () => {
        try {
            var formdata = new FormData();
            formdata.append("app_version", DeviceInfo.getVersion());
            formdata.append("device_type", Platform.OS == 'ios' ? 'iPhone' : 'Android');
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            const response = await fetch(CHECK_VERSION, requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

            const json = await response.json();
            console.log("GetVersionUpdate=>>>>", json)
            if (json.status == 200) {
                version(json.data)
                setVersionData(json.data)
            }
        }
        catch (error) {
            console.log("GetVersionUpdate Error=>> ", error)
        }
    };

    useEffect(() => {
        getVersionNumber()
        // setTimeout(() => {
        //     setModalVisible(!modalVisible)
        // }, 2000);
    }, []);

    const redirectToStore = () => {
        // if (Platform.OS == 'ios') {
        //     const link =
        //         'itms-apps://apps.apple.com/id/app/halojasa/id1492671277?l=id';
        //     Linking.openURL(link);
        // } else {
        Linking.openURL('https://rwapp.randwater.co.za/rand-water/app-store');
        // }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={style.centeredView}>
                <View style={style.modalView}>
                    <Image
                        source={image.logo}
                        style={style.logoStyle} resizeMode='contain' />
                    <Text style={style.modalTitle}>{`New Version Available!`}</Text>
                    <Text style={style.modalText}>
                        {`New version of the Rand Water is available in the App Store. Please update your app to use all of our amazing features.`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {isForceUpdate == 'false' ?
                            <View style={{ width: '45%', marginRight: 15 }}>
                                <WButtonText
                                    title={'Later'}
                                    containerStyle={{
                                        ...style.loginButton,
                                        backgroundColor: 'gray',
                                    }}
                                    style={style.loginButtonText}
                                    onPress={() => setModalVisible(!modalVisible)}
                                // disabled={isSubmitDisabled}
                                />
                            </View>
                            : null
                        }
                        <View style={{ width: '45%' }}>
                            <WButtonText
                                title={'Update'}
                                containerStyle={{
                                    ...style.loginButton,
                                    backgroundColor: colors.darkBlue,
                                }}
                                style={style.loginButtonText}
                                onPress={() => redirectToStore()}
                            // disabled={isSubmitDisabled}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default AppUpdatePopup;

const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 23,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
        marginVertical: 10
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 17,
        color: 'black',
    },
    logoStyle: {
        height: 70,
        width: 140,
    },
    loginButton: {
        backgroundColor: colors.colorWhite,
        borderRadius: moderateScale(12),
        ...styles.mt50,
    },
    loginButtonText: {
        color: colors.colorWhite,
        ...Typography.fontSizes.f20,
        ...Typography.fontWeights.MediumAvenir,
    },
});