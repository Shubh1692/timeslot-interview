import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Button, TextInput, Text} from 'react-native';
import {connect} from 'react-redux';
import {onAddDetail} from '../../actions/timeslot';
import {styles} from './style';
import * as yup from 'yup';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Detail extends Component {
  static propTypes = {
    onAddDetail: PropTypes.func.isRequired,
    selectedSlot: PropTypes.object,
    navigation: PropTypes.object,
  };
  static defaultProps = {
    selectedSlot: null,
  };
  constructor(props) {
    super(props);
    const user = props.selectedSlot
      ? props.selectedSlot
      : {
          firstName: '',
          lastName: '',
          phoneNumber: '',
        };
    this.state = {
      user: user,
    };
  }

  /**
   * This method used for call action for add/update slot detail and navigate to home screen
   */
  async addUpdateDetail(values) {
    const {
      onAddDetail: onAddDetailById,
      navigation,
      route: {
        params: {slotId},
      },
    } = this.props;
    const {firstName, lastName, phoneNumber} = values; // current added
    const user = {firstName, lastName, phoneNumber};
    await onAddDetailById(user, slotId);
    navigation.navigate('Home');
  }

  render() {
    const {user} = this.state;
    const {firstName, lastName, phoneNumber} = user;
    const {selectedSlot} = this.props;
    return (
      <Formik
        initialValues={{
          firstName,
          lastName,
          phoneNumber,
        }}
        onSubmit={(values, actions) => this.addUpdateDetail(values)}
        validationSchema={yup.object().shape({
          firstName: yup.string().required('First Name is required'),
          lastName: yup.string().required('Last Name is required'),

          phoneNumber: yup
            .string()
            .min(10, 'Phone Number not more than 10 digit')
            .required()
            .label('Phone Number'),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          setFieldValue,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.container}>
            <View style={styles.titleSection}>
              <Text style={styles.textFont}>
                Fill the Form to Confirm booking
              </Text>
            </View>
            <View style={styles.item}>
              <TextInput
                placeholder="First name"
                value={values.firstName}
                style={styles.inputSection}
                onChangeText={handleChange('firstName')}
                onBlur={() => setFieldTouched('firstName')}
                isRequired
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorStyles}>{errors.firstName}</Text>
              )}
            </View>
            <View style={styles.item}>
              <TextInput
                placeholder="Last name"
                value={values.lastName}
                style={styles.inputSection}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
                isRequired
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorStyles}>{errors.lastName}</Text>
              )}
            </View>
            <View style={styles.item}>
              <TextInput
                placeholder="Phone number"
                keyboardType="numeric"
                maxLength={10}
                style={styles.inputSection}
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={() => setFieldTouched('phoneNumber')}
                isRequired
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorStyles}>{errors.phoneNumber}</Text>
              )}
            </View>
            <View style={styles.btntopSection}>
              <TouchableOpacity
                disabled={!isValid}
                style={styles.btnSection}
                onPress={handleSubmit}
                color="#841584">
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {selectedSlot ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedSlot: state.timeslot.selectedSlot,
});

const mapDispatchToProps = {
  onAddDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
