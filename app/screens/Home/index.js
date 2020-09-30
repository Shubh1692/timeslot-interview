import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import moment from 'moment';
import {fetchDetailById} from '../../actions/timeslot';
import {styles} from './style';

import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

  render() {
    const {slots} = this.state;
    const {fieldSlot} = this.props;
    console.log('styles', styles);
    return (
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Select Time Slot</Text>
        </View>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
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
