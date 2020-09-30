import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  errorStyles: {
    marginLeft: 15,
    marginTop: 3,
    fontSize: 10,
    color: 'red',
  },
  item: {
    width: '95%',
    margin: '1%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    marginVertical: 10,
  },
  inputSection: {
    backgroundColor: '#FFF',
    width: '90%',
    borderColor: '#999',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  titleSection: {
    marginBottom: 50,
  },
  textFont: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  slotTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  addHere: {
    fontSize: 15,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnSection: {
    backgroundColor: '#990000',
    justifyContent: 'center',
    minHeight: 60,
    borderRadius: 8,
    alignItems: 'center',
  },
  btntopSection: {
    width: '90%',
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    height: 60,
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
});
