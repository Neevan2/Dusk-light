import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [isLightOn, setIsLightOn] = useState(false);
  const [sleepTime, setSleepTime] = useState(new Date());
  const [wakeTime, setWakeTime] = useState(new Date());
  const [showSleepPicker, setShowSleepPicker] = useState(false);
  const [showWakePicker, setShowWakePicker] = useState(false);

  const toggleLight = () => setIsLightOn((prev) => !prev);

  const onSleepTimeChange = (event, selectedDate) => {
    setShowSleepPicker(Platform.OS === 'ios');
    if (selectedDate) setSleepTime(selectedDate);
  };

  const onWakeTimeChange = (event, selectedDate) => {
    setShowWakePicker(Platform.OS === 'ios');
    if (selectedDate) setWakeTime(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dusk Light</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Light is {isLightOn ? 'ON' : 'OFF'}</Text>
        <Switch value={isLightOn} onValueChange={toggleLight} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Sleep Time</Text>
        <Button title={sleepTime.toLocaleTimeString()} onPress={() => setShowSleepPicker(true)} />
        {showSleepPicker && (
          <DateTimePicker
            value={sleepTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onSleepTimeChange}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Wake Time</Text>
        <Button title={wakeTime.toLocaleTimeString()} onPress={() => setShowWakePicker(true)} />
        {showWakePicker && (
          <DateTimePicker
            value={wakeTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onWakeTimeChange}
          />
        )}
      </View>

      <View style={styles.section}>
        <Button title="Apply Schedule" onPress={() => alert('Schedule saved (UI only)')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 40,
  },
  section: {
    marginVertical: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
});
