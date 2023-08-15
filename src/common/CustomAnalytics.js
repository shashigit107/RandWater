
import analytics from '@react-native-firebase/analytics';

const setCurrentScreenName = async (name) => {
    console.log("ScreenName=>>>", name)
    await analytics().logScreenView({ screen_name: name, screen_class: name + '_class', });
    // await analytics().setCurrentScreen(name);
}

const logEventData = async (eventName, data) => {
    await analytics().logEvent(eventName, data);
    // {
    //     id: '123123',
    //     value: 'value',
    //     variable: 'variable',
    // }
}


export {
    setCurrentScreenName,
    logEventData
}