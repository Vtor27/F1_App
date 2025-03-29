import { StyleSheet, Text, Image, View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { getData } from "./services/services";
import CardDriver from "./components/CardDriver";

export default function App() {
  const [drivers, setDrivers] = useState([]);
  const [season, setSeason] = useState("latest");

  useEffect(() => {
    const fetch = async () => {
      const url = `https://api.openf1.org/v1/drivers?session_key=${season}`;
      const response = await getData(url);
      console.log("Se hace el fetch");

      if (Array.isArray(response)) {
        setDrivers(response);
      } else {
        console.error("La API no devolvió un array:", response);
        setDrivers([]);
      }
    };
    fetch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.cabecera}>
          <Image source={require("./assets/images/Logo_F1.png")} style={{ width: 200, height: 50 }}/>
        </View>
        <View style={{ width: "60%", marginBottom: 10 }}>
          <RNPickerSelect 
            onValueChange={(value) => {
              setSeason(value);
            }}
            style={pickerSelectStyles}
        placeholder={{ label: "Elige un año...", value: null }}
            items={[
              { label: "Latest", value: "latest" },
              { label: "2021", value: "2021" },
              { label: "2020", value: "2020" },
              { label: "2019", value: "2019" },
              { label: "2018", value: "2018" },
              { label: "2017", value: "2017" },
              { label: "2016", value: "2016" },
              { label: "2015", value: "2015" },
            ]}
            />
        </View>
        <ScrollView>
          <View style={styles.scrollContainer}>
            {drivers.map((driver, index) => (
              <CardDriver
                key={index}
                name={driver.first_name}
                lastName={driver.last_name}
                teamName={driver.team_name}
                number={driver.driver_number}
                uri={driver.headshot_url}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cabecera: {
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    marginVertical: 10,
    width: "100%",
  },
  
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // Para el ícono de dropdown en Android
    backgroundColor: '#ffffff',
  },
});
