import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Slider from 'react-native-slider';
import Header from '../../component/Header';
import colors from '../../utils/colors';
import {detailsData, sendScheduleNotification} from '../../assets/data';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen: any = ({navigation, route}: any) => {
  let {params} = route;
  let moduleDetails = detailsData.filter((obj: any) => obj.id === params.id)[0];
  const [visible, setVisible] = useState(false);
  const [defaultTime, setDefaultTime] = useState([]);
  const [sliderValue, setSliderValue] = useState(1);
  const [initialInfo, setInitialInfo] = useState([]);
  const [timeBtnCnt, setTimeBtnCnt] = useState([1]);
  const [refresh, setRefresh] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    getLocalData();
  }, []);

  async function getLocalData() {
    let initialData: any = await AsyncStorage.getItem('savedData');
    if (initialData && JSON.parse(initialData).length > 0) {
      let moduleInfo = JSON.parse(initialData);
      let filteredData = moduleInfo.filter((obj: any) => obj.id === params.id);
      if (filteredData?.length > 0) {
        setSliderValue(filteredData[0].sliderValue);
        setDefaultTime(filteredData[0].timeValue);
        if (filteredData[0].timeValue?.length > 0) {
          let dummyArr = [];
          for (let i in filteredData[0].timeValue) {
            dummyArr.push(1);
          }
          setTimeBtnCnt(dummyArr);
          setRefresh(!refresh);
        }
      }
      setInitialInfo(moduleInfo);
    } else {
      let freshData = [];
      for (let i = 0; i < 3; i++) {
        let obj = {
          id: i + 1,
          sliderValue: 1,
          timeValue: [],
        };
        freshData.push(obj);
      }
      setInitialInfo(freshData);
      await AsyncStorage.setItem('savedData', JSON.stringify(freshData));
    }
  }
  async function saveDataToLocalDb() {
    if (!sliderValue || defaultTime.length < 1) {
      Alert.alert('', 'Please provide details for all questions.');
      return;
    }
    for (let i in defaultTime) {
      var now = new Date();
      now.setHours(dayjs(defaultTime[i]).hour());
      now.setMinutes(dayjs(defaultTime[i]).minute());
      now.setMilliseconds(0);
      sendScheduleNotification(
        moduleDetails.notificationTitle,
        moduleDetails.notificationMsg,
        now,
        params.id + moduleDetails.notificationCnt + Number(i),
      );
    }
    let updatedData = initialInfo.map((item: any) => {
      if (item.id === params.id) {
        return {
          ...item,
          sliderValue: sliderValue,
          timeValue: defaultTime,
        };
      }
      return item;
    });

    await AsyncStorage.setItem('savedData', JSON.stringify(updatedData));
    navigation.goBack();
  }

  function setTime(event: DateTimePickerEvent, date: Date) {
    setVisible(false);
    if (event.type === 'dismissed') {
      setSelectedIndex(null);
      return;
    } else {
      defaultTime[selectedIndex] = date;
      setDefaultTime(defaultTime);
      setSelectedIndex(null);
      setRefresh(!refresh);
      return;
    }
  }

  function renderTimeBtn({item, index}: any) {
    return (
      <TouchableOpacity
        style={styles.timeBtn}
        onPress={() => {
          setSelectedIndex(index);
          setVisible(true);
        }}>
        <Text style={styles.timeTxt}>
          {(defaultTime &&
            defaultTime[index] &&
            dayjs(defaultTime[index]).format('hh:mm A')) ||
            'Select Time'}
        </Text>
      </TouchableOpacity>
    );
  }

  function renderQuestionsList({item, index}: any) {
    return (
      <View style={styles.questionsSec}>
        <Text style={styles.itemTxt}>{item.title}</Text>
        {item.tipTxt && <Text style={styles.tipTxt}>{item.tipTxt}</Text>}
        {item?.type === 1 && (
          <>
            <Slider
              minimumValue={item.minLimit}
              maximumValue={item.maxLimit}
              step={1}
              style={styles.sliderContainer}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              minimumTrackTintColor={colors.headerBack}
              value={sliderValue}
              onValueChange={(value: any) => setSliderValue(value)}
            />
            <Text style={styles.itemTxt}>{sliderValue}</Text>
          </>
        )}
        {item?.type === 2 && (
          <>
            <FlatList
              data={timeBtnCnt}
              renderItem={renderTimeBtn}
              extraData={refresh}
            />
            {item.multiple && timeBtnCnt.length < 6 && (
              <Text
                style={styles.addMoreTxt}
                onPress={() => {
                  timeBtnCnt.push(1);
                  setTimeBtnCnt(timeBtnCnt);
                  setRefresh(!refresh);
                }}>
                {'Add More'}
              </Text>
            )}
          </>
        )}
        {item?.type === 3 && (
          <>
            <Text
              style={styles.nameTxt}>{`Specialist Name: ${item.name}`}</Text>
            <TouchableOpacity
              style={[styles.timeBtn, styles.contactBtn]}
              onPress={() => {
                Linking.openURL(`tel:${item.phone}`);
              }}>
              <Text style={styles.contactTxt}>{`Phone: ${item.phone}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.timeBtn, styles.contactBtn]}
              onPress={() => {
                Linking.openURL(`mailto:${item.email}`);
              }}>
              <Text style={styles.contactTxt}>{`Email: ${item.email}`}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        backBtn
        navigation={navigation}
        title={moduleDetails?.title || 'Details'}
      />
      <FlatList
        data={moduleDetails?.questions || []}
        renderItem={renderQuestionsList}
      />
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => {
          saveDataToLocalDb();
          // navigation.goBack();
        }}>
        <Text style={styles.submitTxt}>{'Submit'}</Text>
      </TouchableOpacity>
      {visible && (
        <RNDateTimePicker
          value={
            (defaultTime.length > 0 &&
              new Date(
                (defaultTime[selectedIndex] && defaultTime[selectedIndex]) ||
                  new Date(),
              )) ||
            new Date()
          }
          mode="time"
          onChange={setTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  itemTxt: {
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
  },
  tipTxt: {
    fontSize: 11,
    fontFamily: 'OpenSans-Regular',
    color: colors.lightSubTxt,
    marginTop: 5,
  },
  questionsSec: {
    width: '93%',
    backgroundColor: colors.pureWhite,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 7,
    alignSelf: 'center',
    padding: 15,
  },
  submitBtn: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: colors.headerBack,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginVertical: 40,
  },
  submitTxt: {
    fontSize: 17,
    fontFamily: 'OpenSans-Medium',
    color: colors.pureWhite,
  },
  timeBtn: {
    height: 45,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.headerBack,
    marginTop: 20,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeTxt: {
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: colors.headerBack,
    borderWidth: 2,
  },
  sliderContainer: {
    marginTop: 15,
  },
  contactBtn: {
    marginTop: 15,
  },
  contactTxt: {
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
  },
  nameTxt: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
    marginTop: 15,
  },
  addMoreTxt: {
    alignSelf: 'flex-end',
    fontSize: 13,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

export default DetailsScreen;
