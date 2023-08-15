import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, SafeAreaView, TouchableOpacity, FlatList, Dimensions, Image, Platform } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import CustomSlider from '../../../components/slider/CustomSlider';
import RNVideoHelper from 'react-native-video-helper';
import strings from '../../../i18n/strings';
import WLoader from '../../../components/common/WLoader';
import {
    appPermission,
    captureImageFromCamera,
    checkPlatform,
    permissionType,
    pickImageOrVideoFromGallery,
    showPopupWithOk,
} from '../../../utils/helpers';
import {
    water_Problem_address,
    water_Problem_date,
    water_Problem_image,
    water_Problem_location,
    water_Problem_notes,
} from '../../../redux/actions/home';
import { useDispatch, useSelector } from 'react-redux';
import { createThumbnail } from "react-native-create-thumbnail";
import { getHeight, moderateScale } from '../../../common/constants';
import { numberConverter } from '../../../utils/helpers'
import { CloseBlueIcon } from '../../../assets/svgs';

const { width, height } = Dimensions.get("window")
const mediaType = 'video'

const VideoCroperView = ({ video, donePress, closePress }) => {
    const dispatch = useDispatch();
    const [isActivityLoading, setActiivtyLoading] = useState(false)
    const [remainSize, setRemainSize] = useState(video.size / 1000)
    const [remainDuration, setRemainDuration] = useState(video.duration / 1000)
    const [cropVideo, setCropVideo] = useState(video)
    const [thumbnailImages, setThumbnailImages] = useState([])

    useEffect(() => {
        const generateThumbnailImages = async () => {
            let ddd = Math.trunc(video.duration / 10000);
            let paths = [];
            for (let i = 0; i < 10; i++) {
                try {
                    const response = await createThumbnail({
                        url: video.path,
                        timeStamp: ddd * 1000,
                    });
                    paths.push(response.path);
                    if (paths.length === 10) {
                        setThumbnailImages(paths);
                    }
                } catch (err) {
                    console.log({ err });
                }
                ddd += ddd;
            }
        };
        generateThumbnailImages();
    }, []);

    const setleftRightSecCallBack = (leftSec, rightSec) => {
        setActiivtyLoading(true)
        let sizeFindOut = Math.floor((video.size) / 1000)
        let secondFindout = Math.floor((video.duration) / 1000)
        let oneSecCarryKb = Math.floor(sizeFindOut / secondFindout)
        let secondCutFromVideo = secondFindout - rightSec + leftSec
        let remainLeftVideo = secondFindout - secondCutFromVideo
        let cutMbInVideo = remainLeftVideo * oneSecCarryKb
        console.log("cutMbInVideo", cutMbInVideo, " =>secondFindout=>> ", remainLeftVideo)
        setRemainSize(cutMbInVideo)
        setRemainDuration(remainLeftVideo)

        console.log("leftSecright", leftSec, rightSec)
        RNVideoHelper.compress(video.path, {
            startTime: leftSec, // optional, in seconds, defaults to 0
            endTime: rightSec, //  optional, in seconds, defaults to video duration
            quality: 'medium', // default low, can be medium or high
            defaultOrientation: 0 // By default is 0, some devices not save this property in metadata. Can be between 0 - 360
        }).progress(value => {
            console.log('progress', value); // Int with progress value from 0 to 1
        }).then(compressedUri => { // String with path to temporary compressed video
            let file = "";
            if (Platform.OS == 'android') {
                file = `file:///${compressedUri}`
            } else {
                file = compressedUri
            }
            setCropVideo({ path: file });
            setActiivtyLoading(false)
        })
    }
    const cropedVideo = () => {
        console.log("remainDuration", remainDuration, remainSize)
        if (remainSize > 20000) {
            showPopupWithOk(
                strings.randWater,
                `You can't upload ${mediaType} greater than 20MB.`,
            );
        } else {
            let pickObjectVideo = {}
            pickObjectVideo["duration"] = remainDuration//metaData.duration
            pickObjectVideo["path"] = cropVideo.path//result
            pickObjectVideo["height"] = video.height//metaData.height
            pickObjectVideo["size"] = remainSize//metaData.size
            pickObjectVideo["width"] = video.width//metaData.width//mime:"video/mp4"
            pickObjectVideo["mime"] = video.mime//pickObject.mime
            console.log("Request DATA=>", pickObjectVideo)
            dispatch(water_Problem_image(pickObjectVideo));
            donePress(false)
        }
        console.log("cropedVideo", cropVideo)
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', height: moderateScale(60) }}>
                <TouchableOpacity style={{ paddingHorizontal: 10, justifyContent: 'center' }}
                    onPress={() => closePress(true)}>
                    <CloseBlueIcon />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <VideoPlayer
                    style={{ backgroundColor: 'white', height: Platform.OS == 'ios' ? height - moderateScale(250) : height - moderateScale(200) }}
                    video={{ uri: cropVideo.path }}
                    // controls={false}
                    // disableControlsAutoHide
                    // disableSeek={true}
                    thumbnail={{ uri: thumbnailImages[0] }}
                />
                <View style={{ height: 160, width: width, backgroundColor: 'rgba(52, 52, 52, 0.2)' }}>
                    <FlatList
                        style={{ marginHorizontal: 12, marginTop: 47 }}
                        horizontal={true}
                        data={thumbnailImages}
                        renderItem={({ item }) => {
                            // console.log("Item===>", item)
                            return (
                                <Image style={{ height: 30, width: (width - 24) / 10 }} source={{ uri: item }}></Image>
                            )
                        }
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ position: 'absolute', width: width }}>
                        <CustomSlider
                            maxVideoDuration={Math.trunc((video.duration) / 1000)}
                            setleftRightSecCallBack={setleftRightSecCallBack}
                            cropedVideo={cropedVideo}
                            sizeOfVideo={remainSize / 1000}
                            durationOfVideo={numberConverter(remainDuration, 0)}
                        />
                    </View>
                </View>
            </View>
            {isActivityLoading && <WLoader />}
        </View>
    )
}

export default VideoCroperView;