import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text, Switch, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, ActivityIndicator, Image } from 'react-native';
import { CrossIcon, Filter, Home, Next, Setting, WhiteNext } from './src/Assets/SvgImages';
import axios from 'axios';
import { showSuccessToast, toastConfig } from './src/Utils/Helper';
import Toast from 'react-native-toast-message';

const App = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState('');
  const [search, setSearch] = useState('');
  const [byDay, setByDay] = useState(false);
  const [everyday, setEveryDay] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [deletedElements, setDeletedElements] = useState([]);

  const toggleSwitch = () => {
    setByDay(current => !current);
  };

  const toggleEverySwitch = () => {
    setEveryDay(current => !current);
  };

  const onSearch = (text) => {
    setSearch(text);
    const filter = data.filter(e => e.name.toLowerCase().includes(text.toLowerCase()));
    setData(filter);
  };

  const fetchData = async () => {
    setLoader(true)
    const url = 'https://devapi.getgoally.com/v1/api/reminders/all';
    const token = 'ddc58e6a-2e69-4f44-97e8-1454eb352069';

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.docs);
      setData(response.data.docs);
      setIsDataLoaded('true')
      setLoader(false)
    } catch (error) {
      console.error(error);
    }
  };

  const deleteElement = (elementId) => {
    const deletedElement = data.find((element) => element.id === elementId);
    if (deletedElement) {
      const updatedData = data.filter((element) => element.id !== elementId);
      setData(updatedData);
      setDeletedElements([...deletedElements, deletedElement]);
      showSuccessToast('Delete Successfully', 2000)
    }
  };

  const restoreDeletedElements = () => {
    setData([...data, ...deletedElements]);
    setDeletedElements([]);
  };

  const handleSort = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setData(sortedData);
  };

  useEffect(() => {
    fetchData();
    restoreDeletedElements()
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : null} style={styles.mainContainer}>
      <StatusBar barStyle='light-content' backgroundColor={'#182545'} />
      <View style={styles.header}>
        <View style={styles.iconView}>
          <View style={styles.icon}>
            <Home />
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>Routines</Text>
        </View>
        <View style={styles.iconView}>
          <View style={styles.icon}>
            <Setting />
          </View>
        </View>
      </View>
      <View style={styles.routineView}>
        <View style={{ width: '42%' }}>
          <Text style={{ color: 'black', fontWeight: '600', textAlign: 'center' }}>Morning Routine</Text>
          <View style={{ padding: 10, backgroundColor: '#CFE4FF', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'black' }}>Weekdays</Text>
                <Text style={{ color: 'black' }}>7:00 AM</Text>
              </View>
              <View></View>
            </View>
            <View style={styles.switchView}>

              <Switch
                barHeight={50}
                switchWidth={50}
                switchHeight={20}
                trackColor={{ false: 'white', true: '#72CEBC' }}
                thumbColor={byDay ? 'white' : '#72CEBC'}
                onValueChange={toggleSwitch}
                value={byDay} />
              <Next />
            </View>
          </View>
        </View>
        <View style={{ width: '42%' }}>
          <Text style={{ color: 'black', fontWeight: '600', textAlign: 'center' }}>Night Routine</Text>
          <View style={{ padding: 10, backgroundColor: '#182545', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: 'white' }}>Every day</Text>
                <Text style={{ color: 'white' }}>9:00 PM</Text>
              </View>
              <View></View>
            </View>
            <View style={styles.switchView}>

              <Switch
                barHeight={50}
                switchWidth={50}
                switchHeight={20}
                trackColor={{ false: '#72777F', true: 'white' }}
                thumbColor={everyday ? '#72777F' : 'white'}
                onValueChange={toggleEverySwitch}
                value={everyday} />
              <WhiteNext />
            </View>
          </View>
        </View>

      </View>
      <View style={{ flex: 1, paddingHorizontal: 14 }}>
        <View style={styles.searchView}>
          <View style={styles.searchField}>
            <TextInput style={{ width: search == '' ? '96%' : '90%', color: 'black', fontSize: 15, paddingBottom: 0, paddingTop: 0, }} placeholder={'Search'} placeholderTextColor={'#ccc'} value={search} onChangeText={text => onSearch(text)} />

            {search != '' &&
              <View style={{ justifyContent: 'center', }}>
                <TouchableOpacity onPress={() => onSearch('')}>
                  <CrossIcon height={24} width={24} />
                </TouchableOpacity>
              </View>
            }
          </View>
          <View style={{ width: '18%', justifyContent: 'center', alignSelf: 'center', alignItems: 'flex-end' }}>
            <TouchableOpacity >
              <Filter />
            </TouchableOpacity>
          </View>
        </View>
        {isDataLoaded &&
          <FlatList showsVerticalScrollIndicator={false} numColumns={1} ListEmptyComponent={
            <View style={{ width: '70%', marginTop: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'black', textAlign: 'center' }}>There is no record.</Text>
            </View>
          } data={data} renderItem={({ item }) =>
            <TouchableOpacity activeOpacity={1} onPress={() => deleteElement(item.id)}>
              <View style={styles.listView}>
                <View style={{ width: '20%' }}>
                  <Image source={{ uri: item.visualAidUrl }} style={{ height: 50, width: 50, borderRadius: 30 }} />
                </View>
                <View style={{ width: '66%', marginLeft: 10 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', }}>{item.name}</Text>
                  <Text style={{ color: 'black', fontWeight: '400', }}>{item.schedule.Fri}</Text>
                </View>
                <View style={{ width: '10%', alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={() => handleSort()}>
                    <Next />
                  </TouchableOpacity>
                </View>


              </View>
            </TouchableOpacity>
          }
          />
        }
      </View>

      <Toast config={toastConfig}></Toast>

      {loader == true &&
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size='small' color={'black'} />
        </View>
      }
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FDFCFF',
  },
  header: {
    height: 60,
    backgroundColor: '#182545',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconView: {
    width: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textView: {
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  routineView: {
    backgroundColor: '#FDFCFF',
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10
  },
  switchView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 4,
  },
  searchView: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  searchField: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    width: '82%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    height: 47
  },
  listView: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginVertical: 5,
    width: '96%',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
