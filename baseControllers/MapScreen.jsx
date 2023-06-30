import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

// The data for the list items
const listData = [
  {
    title: 'Bart Simpson',
    subtitle: 'AM - Southbound Route',
    status: 'Not Boarded',
    statusType: 'NotBoarded',
    details: 'These are the details for item 1',
    color: 'lightblue',
    latitude: -34.971,
    longitude: 138.55,
  },
  {
    title: 'Lisa Simpson',
    subtitle: 'AM - Northbound Route',
    status: 'ON 8:15 AM',
    statusType: 'ON',
    // status: 'OFF 8:48 AM',
    // statusType: 'OFF',
    // status: 'Not Boarded',
    // statusType: 'NotBoarded',
    details: 'These are the details for item 1',
    color: 'purple',
    latitude: -34.981,
    longitude: 138.56,
  },
  {
    title: 'Maggie Simpson',
    subtitle: 'AM - Eastbound Route',
    status: 'OFF 8:45 AM',
    statusType: 'OFF',
    // status: 'Not Boarded',
    // statusType: 'NotBoarded',
    details: 'These are the details for item 1',
    color: 'green',
    latitude: -34.981,
    longitude: 138.53,
  },
  // ...more items
];

const STATUS_COLORS = {
  NotBoarded: 'white',
  ON: '#82f5ff',
  OFF: '#82ffa3',
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sash: {
    width: 15,
  },
  listItemContent: {
    flex: 1,
    backgroundColor: 'white', // Default color
  },
  listItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemSubtitle: {
    fontSize: 16,
  },
  listItemStatus: {
    fontSize: 16,
    color: '#888',
  },
  listItemDetails: {
    marginTop: 8,
    fontSize: 14,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerView: {
    width: '100%',
    alignItems: 'center', // This centers the text horizontally.
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // This centers the text horizontally within the Text component itself, not necessary if the headerView's alignItems is set to 'center'
  },
  contentContainer: {
    backgroundColor: '#F5F6F7',
  },
  scanHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'grey',
    padding: 5,
  },
  scanRow: {
    padding: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  scanRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  scanTypeOn: {
    color: 'green',
    fontWeight: 'bold',
  },
  scanTypeOff: {
    color: 'red',
    fontWeight: 'bold',
  },
  scanTime: {
    color: 'grey',
  },
  scanLocation: {
    paddingBottom: 5,
    color: 'black',
  },
  scanStop: {
    paddingBottom: 5,
    color: 'black',
  },
  exceptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scanException: {
    fontSize: 14,
    color: 'blue',
  },
  noScanRow: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noScanContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noScanIcon: {
    marginRight: 10,
  },
  noScanText: {
    fontSize: 14,
    color: 'grey',
  },
});

const MapScreen = () => {
  // refs
  const bottomSheetRef = useRef(null);
  const mapViewRef = useRef(null); // Initialize the mapViewRef

  // variables
  const snapPoints = useMemo(() => ['15%', '30%', '60%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  //Selected route state
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  const [filteredData, setFilteredData] = useState(listData);

  useEffect(() => {
    setFilteredData(
      selectedRoute
        ? listData.filter(item => item.subtitle === selectedRoute)
        : listData,
    );
  }, [selectedRoute]);

  function ExpandableListItem({item, isExpanded, onExpand}) {
    const [heightAnim] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 180 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isExpanded]);

    return (
      <TouchableOpacity onPress={onExpand} style={styles.listItem}>
        <View style={[styles.sash, {backgroundColor: item.color}]}></View>
        <View
          style={[
            styles.listItemContent,
            {backgroundColor: STATUS_COLORS[item.statusType]},
          ]}>
          <View style={styles.listItemTop}>
            <View>
              <Text style={styles.listItemTitle}>{item.title}</Text>
              <Text style={styles.listItemSubtitle}>{item.subtitle}</Text>
            </View>
            <View>
              <Text style={styles.listItemStatus}>{item.status}</Text>
            </View>
          </View>
          <Animated.View
            style={{
              height: heightAnim,
              overflow: 'hidden',
              backgroundColor: 'white',
            }}>
            <Text style={styles.scanHeader}>Student Scans</Text>
            {item.statusType === 'ON' || item.statusType === 'OFF' ? (
              <View style={styles.scanRow}>
                <View style={styles.scanRowTop}>
                  <Text style={styles.scanTypeOn}>
                    SCAN ON - 123 Elm Street - O'halloran
                  </Text>
                  <Text style={styles.scanTime}>7:30 AM</Text>
                </View>

                <Text style={styles.scanStop}>Stop: 26 PIMPALA ROAD</Text>
                <View style={styles.exceptionContainer}>
                  <Text style={styles.scanException}>
                    Exceptions: Wrong Stop, No Card
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.noScanRow}>
                <View style={styles.noScanContent}>
                  <Text style={styles.noScanText}>
                    No scan data available. Student has not been scanned yet.
                  </Text>
                </View>
              </View>
            )}
            {item.statusType === 'OFF' ? (
              <View style={styles.scanRow}>
                <View style={styles.scanRowTop}>
                  <Text style={styles.scanTypeOff}>
                    SCAN OFF - 5 - Majors Rd - O'Halloran Hill
                  </Text>
                  <Text style={styles.scanTime}>8:45 AM</Text>
                </View>

                <Text style={styles.scanStop}>Stop: IQRA COLLEGE CAMPUS</Text>
                <View style={styles.exceptionContainer}>
                  <Text style={styles.scanException}>Exceptions: None</Text>
                </View>
              </View>
            ) : null}
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  }

  function BottomSheetContent({data}) {
    // Function to handle the button press
    const handleBackButtonPress = () => {
      setSelectedRoute(null);
      // Deselect the marker
      // mapViewRef.current.deselectMarker();
    };

    console.log(selectedRoute);

    return (
      <>
        {selectedRoute !== null ? (
          <View style={styles.buttonView}>
            <Button
              title="Back"
              onPress={handleBackButtonPress}
              style={styles.backButton}
            />
            <Text style={styles.headerTitle}>{selectedRoute}</Text>
            <View style={{width: 60}}></View>
          </View>
        ) : (
          <View style={styles.headerView}>
            <Text style={styles.headerTitle}>Live Student Tracking</Text>
          </View>
        )}
        {data.map((item, index) => (
          <ExpandableListItem
            key={index}
            item={item}
            isExpanded={expandedItem === index}
            onExpand={() =>
              setExpandedItem(expandedItem === index ? null : index)
            }
          />
        ))}
      </>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        ref={mapViewRef} // Add a ref to the MapView component
        initialRegion={{
          latitude: -34.980756453296976,
          longitude: 138.55893865444926,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.1421,
        }}>
        {listData.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.subtitle}
            onPress={() => setSelectedRoute(marker.subtitle)}
          />
        ))}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        key={selectedRoute}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{backgroundColor: 'transparent'}}
        style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <BottomSheetContent data={filteredData} />
        </View>
      </BottomSheet>
    </View>
  );
};

export default MapScreen;
