import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../utils/colors';

const Header: any = ({title, backBtn, backPress, navigation}: any) => {
  return (
    <View style={styles.headerSec}>
      <TouchableOpacity
        style={styles.backBtn}
        disabled={!backBtn}
        onPress={() => {
          if (backPress) {
            backPress();
          } else {
            navigation.goBack();
          }
        }}>
        {backBtn && (
          <Image
            style={styles.backImg}
            source={require('../../assets/images/backBtn.png')}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.headTxt}>{title || 'Select Mode'}</Text>
      <TouchableOpacity style={styles.backBtn} disabled>
        {/* <Image
          style={styles.backImg}
          source={require('../../assets/images/backBtn.png')}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSec: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.pureWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  headTxt: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    color: colors.headerBack,
    textAlign: 'center',
  },
  backBtn: {
    height: 50,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImg: {
    height: 12,
    width: 8,
  },
});

export default Header;
