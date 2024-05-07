import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Header from '../../component/Header';
import colors from '../../utils/colors';
import {dashboardData, sendScheduleNotification} from '../../assets/data';

const HomeScreen: any = ({navigation}: any) => {
  useEffect(() => {
    createChannel();
  }, []);

  function createChannel() {
    PushNotification.createChannel(
      {
        channelId: 'healthBuddy',
        channelName: 'healthBuddy',
        playSound: false,
        soundName: 'default',
        vibrate: true,
      },
      (created: any) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  function renderItemsList({item, index}: any) {
    return (
      <TouchableOpacity
        style={styles.itemBtn}
        onPress={() => {
          navigation.navigate('Details', {id: index + 1});
        }}>
        <View style={styles.leftSec}>
          <View style={styles.iconView}>
            <Image style={styles.iconImg} source={item.image} />
          </View>
          <Text style={styles.itemTxt}>{item.title}</Text>
        </View>
        <Image
          style={styles.rightArrow}
          source={require('../../assets/images/backBtn.png')}
        />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <Header title={'Dashboard'} />
      <FlatList
        style={styles.listStyle}
        data={dashboardData}
        renderItem={renderItemsList}
      />
      <View style={styles.bottomSec}>
        <Image
          style={styles.appIcon}
          source={require('../../assets/images/appIcon.png')}
        />
        <Text style={styles.versionTxt}>{'v1.0.0'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  itemBtn: {
    width: '95%',
    height: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 7,
    paddingHorizontal: 20,
  },
  leftSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dullWhite,
  },
  iconImg: {
    height: 27,
    width: 27,
    tintColor: colors.headerBack,
  },
  itemTxt: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
    marginLeft: 20,
  },
  rightArrow: {
    height: 12,
    width: 8,
    transform: [{rotate: '180deg'}],
  },
  listStyle: {
    alignSelf: 'center',
    marginTop: 20,
  },
  bottomSec: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIcon: {
    height: 25,
    width: 25,
  },
  versionTxt: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    color: colors.lightSubTxt,
    marginTop: 5,
  },
});

export default HomeScreen;
