import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import PushNotification from 'react-native-push-notification';
import colors from '../../utils/colors';
import {arr, sliderItem} from '../../assets/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
let width = Math.round(Dimensions.get('window').width);
let height = Math.round(Dimensions.get('window').height);

const Introduction: any = ({navigation}) => {
  const [walkThrough, setWalkthrough] = useState(0);
  const [visible, setVisible] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    getUserStatus();
  }, []);

  async function getUserStatus() {
    setVisible(true);
    return;
    let status = await AsyncStorage.getItem('isDashboard');
    if (status) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      setVisible(true);
      return;
    }
  }

  const renderIndicator = () => {
    return (
      <View style={styles.dotMainSec}>
        {arr.map((item, index) => {
          let height = 6;
          let width = 6;
          let backgroundColor = colors.lightSubTxt;
          if (index == walkThrough) {
            width = 12;
            backgroundColor = colors.gradientOne;
          }
          return (
            <View key={'dot_' + index}>
              <View
                style={[
                  styles.dotSec,
                  {
                    backgroundColor: backgroundColor,
                    width: width,
                    height: height,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    );
  };

  const onPressNext = async () => {
    PushNotification.cancelAllLocalNotifications();
    if (walkThrough === 2) {
      await AsyncStorage.setItem('isDashboard', '1');
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      return;
    } else {
      let newX = walkThrough + 1;
      sliderRef.current.scrollToIndex({index: newX});
      setWalkthrough(newX);
    }
  };

  const renderItem = ({item, index}: any) => {
    let marginLeft = 300;
    if (index == 3) {
      marginLeft = 200;
    }
    return (
      <View style={[styles.cardView]}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={item.image}
            style={[styles.imgStyle, {height: marginLeft}]}
            resizeMode="contain"
          />
        </View>
        <View style={{marginLeft: 41}}>{renderIndicator()}</View>
        <View style={styles.contentWrapper}>
          <Text style={[styles.headTxt, {color: colors.headerBack}]}>
            {item.title}
          </Text>
          <View style={{marginTop: 8}}>
            <Text style={[styles.smallTxt, {color: colors.headerBack}]}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {visible ? (
        <>
          <SwiperFlatList
            onChangeIndex={({index}: any) => setWalkthrough(index)}
            data={sliderItem}
            renderItem={renderItem}
            bounces={false}
            ref={sliderRef}
          />
          <View style={styles.listMainView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.skipBtn}
              onPress={async () => {
                await AsyncStorage.setItem('isDashboard', '1');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                });
              }}>
              <Text style={styles.skipTxt}>{'Skip'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.nxtBox}
              onPress={onPressNext}
              activeOpacity={0.7}>
              <Text style={styles.nxtTxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loadingTxt}>{'Loading...'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  imgStyle: {
    height: 250,
    width: '90%',
    alignSelf: 'center',
  },
  cardView: {
    marginTop: height * 0.08,
    width: width,
  },
  headTxt: {
    fontSize: 27,
    fontFamily: 'OpenSans-Bold',
  },
  smallTxt: {
    textAlign: 'left',
    fontSize: 13,
    fontFamily: 'OpenSans-Medium',
  },
  nxtBox: {
    width: 114,
    height: 41,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    marginTop: height * 0.05,
    width: 294,
    marginLeft: 38,
    marginRight: 44,
  },
  nxtTxt: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  listMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  skipTxt: {
    color: colors.commentGrey,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  dotMainSec: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 67,
  },
  dotSec: {
    height: height,
    width: width,
    borderRadius: 6,
    marginRight: 5,
  },
  skipBtn: {
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingTxt: {
    color: colors.headerBack,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default Introduction;
