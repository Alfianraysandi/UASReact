import { Text, View, StyleSheet, Image } from "react-native";
import { ButtonTemplate } from "@/components";
import { router } from 'expo-router';

export default function Index() {
  const routeToLogin = () => {
    router.push('/login')
  }
  return (
    <View style={style.section}>
      {/* <Image
        style={style.welcomeImg}
        source={require('./assets/images/logo.png')}
      /> */}

      <Text style={[style.welcomeText, style.welcomeTextAll]}></Text>
      <View style={style.container}>
        <Text style={[style.welcomeTextSub, style.welcomeTextAll]}></Text>
        <ButtonTemplate
          title="Let's Go"
          onPress={routeToLogin}
          style={style.button} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  container: {
    alignItems: "center",
    width: '75%',
  },

  welcomeTextAll: {
    marginTop: 8,
    fontFamily: "sans-serif",
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#111111',
  },

  welcomeTextSub: {
    fontSize: 16,
    textAlign: 'center',
    color: '#707070',
    letterSpacing: 1,
    marginBottom: 103,
  },

  welcomeImg: {
    width: 214,
    height: 211,
  },

  button: {
    padding: 15,
    borderRadius: 8,
  },
})
