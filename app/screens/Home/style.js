import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    alignItems: 'flex-start'
  },
  innerContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  titleSection: {
    width: '100%',
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    width: '44%',
    borderRadius: 5,
    height: '21.7%',
    marginTop: 10,
    margin: '1%',
    overflow: 'hidden',
    borderColor: '#999',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
    elevation: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  green: {
    borderWidth: 2,
    borderColor: 'green',
    color: 'white',
  },
  white: {
    backgroundColor: 'white',
    color: 'black',
  },
});