import React from 'react';
import {View, Text,TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { Close } from '../Assets/SvgImages';

export const toastConfig = {
    success: (props) => (
      <View style={{ borderRadius: 15, zIndex: 9999, shadowOffset: { width: -2, height: 4 }, shadowColor: '#ffffff', shadowOpacity: 0.5, shadowRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2B2C29', width: '90%', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, borderColor: '#9b9787', borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
          <View style={{ height: 9, width: 9, borderRadius: 10, backgroundColor: '#63ba04' }}></View>
  
          <View style={{ paddingLeft: 12, width: '98%', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 14, color: '#ffffff', fontFamily: 'HelveticaNeue', lineHeight: 16 }}>{props.text1}</Text>
          </View>
        </View>
  
        <TouchableOpacity onPress={() => { Toast.hide() }} style={{ alignSelf: 'flex-end' }}>
          <Close height={24} width={24} />
        </TouchableOpacity>
      </View>
    ), error: (props) => (
      <View style={{ borderRadius: 15, shadowOffset: { width: -2, height: 4 }, shadowColor: '#ffffff', shadowOpacity: 0.5, shadowRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2B2C29', width: '90%', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 10, borderColor: '#9b9787', borderWidth: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '85%' }}>
          <View style={{ height: 9, width: 9, borderRadius: 10, backgroundColor: '#e52e2d' }}></View>
  
          <View style={{ paddingLeft: 12, width: '98%', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 14, color: '#ffffff', fontFamily: 'HelveticaNeue', lineHeight: 16 }}>{props.text1}</Text>
          </View>
        </View>
  
        <TouchableOpacity onPress={() => { Toast.hide() }} style={{ alignSelf: 'flex-end' }}>
          <Close height={24} width={24} />
        </TouchableOpacity>
      </View>
    )
  };
  
  export function showSuccessToast(text, duration) {
    const data = {
      text1: text,
      topOffset: 50,
      type: 'success',
      position: 'top',
      isVisible: true,
      visibilityTime: duration,
    };
    Toast.show(data);
  }
  
  export function showErrorToast(text, duration) {
    const data = {
      text1: text,
      topOffset: 50,
      type: 'error',
      position: 'top',
      isVisible: true,
      visibilityTime: duration,
    };
    Toast.show(data);
  }
  
  export const removeItemfromArray = (arrayName, setArrayName, item) => {
    if (arrayName.includes(item)) {
      const filteredList = arrayName.filter((e) => e != item);
      return setArrayName(filteredList);
    }
  }
  