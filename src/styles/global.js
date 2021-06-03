import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  content: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // marginHorizontal: '2.5%',
    // flex: 1,
  },
  title: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    // marginHorizontal: '2.5%',
  },
  button: {
    backgroundColor: '#28303B',
    // width: '95%',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  link: {
    color: '#FFF',
    marginTop: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default globalStyles;
