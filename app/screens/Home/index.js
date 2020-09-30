import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Platform} from 'react-native';
import moment from 'moment';
import {fetchDetailById} from '../../actions/timeslot';
import {styles} from './style';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
const slotConfig = {
  nextSlot: 60,
  startTime: '9:00',
  endTime: '17:00',
};

class Home extends Component {
  static propTypes = {
    fetchDetailById: PropTypes.func.isRequired,
    fieldSlot: PropTypes.object,
    navigation: PropTypes.object,
  };
  static defaultProps = {
    fieldSlot: {},
  };

  constructor(props) {
    super(props);
    let slotStartTime = moment(slotConfig.startTime, 'HH:mm');
    const endEndTime = moment(slotConfig.endTime, 'HH:mm');
    const slots = [];
    while (slotStartTime < endEndTime) {
      slots.push({
        title: `${slotStartTime.format('HH:mm')} - ${slotStartTime
          .add(slotConfig.nextSlot, 'minutes')
          .format('HH:mm')}`,
        id: slots.length + 1,
      });
    }
    this.state = {
      slots,
    };
  }

  /**
   * This method used for move detail screen for selected slot
   * @param slotId Selected slot id
   */
  async onAddSlot(slotId) {
    const {navigation, fetchDetailById: fetchDetailByIdLocal} = this.props;
    await fetchDetailByIdLocal(slotId);
    navigation.navigate('Detail', {
      slotId,
    });
  }

  async showGallery() {
    const result = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      }),
    );
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.info(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.info(
          'The permission has not been requested / is denied but requestable',
        );
        break;
      case RESULTS.GRANTED:
        const options = {
          title: 'Gallery',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.info('Response = ', response);
          if (response.didCancel) {
            console.info('User cancelled image picker');
          } else if (response.error) {
            console.info('ImagePicker Error: ', response.error);
          } else {
            const source = {uri: response.uri};
            console.info(source);
          }
        });

        break;
      case RESULTS.BLOCKED:
        console.info('The permission is denied and not requestable anymore');
        break;
    }
  }

  render() {
    const {slots} = this.state;
    const {fieldSlot} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Time Slot</Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.innerContainer}>
            {slots.map(({id, title}) => (
              <View
                key={id}
                style={[
                  styles.item,
                  fieldSlot[id] ? styles.green : styles.white,
                ]}>
                <TouchableOpacity
                  onPress={() => this.onAddSlot(id)}
                  style={styles.card}>
                  <Text style={styles.slotTitle}> {title}</Text>
                  {!fieldSlot[id] && (
                    <Text style={styles.addHere}> Add Here</Text>
                  )}
                  {fieldSlot[id] && (
                    <Text style={styles.addHere}> Update Here</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.btntopSection}>
              <TouchableOpacity
                style={styles.btnSection}
                onPress={() => this.showGallery()}
                color="#841584">
                <Text style={styles.btnTxt}>Show Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  fieldSlot: state.timeslot.fieldSlot,
});

const mapDispatchToProps = {
  fetchDetailById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
