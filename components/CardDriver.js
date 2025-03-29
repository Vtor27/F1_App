import { View, StyleSheet, Image, Text } from "react-native";

export default function Card({ uri, name, lastName, teamName, number }) {
  return (
    <View style={styles.containerCard}>
        <Image style={styles.image} resizeMode="contain" source={{ uri }} />
        <View style={styles.bodyCard}>
            <Text style={styles.title}>{name} {lastName}</Text>
            <Text>Team: {teamName}</Text>
            <Text>Number: {number}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    height: 300,
    width: "100%",
    borederBottomRadius: 5,
    borderColor: "black",
  },
  image: {
    width: 286,
    height: 180,
    borderTopRadius: 5,
  },
  bodyCard: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  }
});