import React from "react";
import PropTypes from "prop-types";
import Formatters from "../../utils/Formatters"
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

// TODO: define and expose function for getting color and desc for each run

// TODO: resolve heart rate based on type

export default class DayGoalComponent extends React.Component {
    static propTypes = {
        day: PropTypes.object.isRequired
    }

    render() {
        const {day} = this.props;

        return (
            <View style={styles.component}>
                <Text style={styles.text_label}>Päivän ohjelma</Text>
                <Text style={styles.text_days_until}>{Formatters.dayToDistanceDesc(day)}</Text>
                <Text style={styles.text_runType}>{Formatters.dayToTypeDesc(day)}</Text>
                <Text style={styles.text_bpmRange}>❤ 113 - 141 bpm</Text>
            </View>
        );
      }
}

const styles = StyleSheet.create({

    component: {
        alignItems: "center",  
        backgroundColor: "#111",
        paddingTop: 10,
        paddingBottom: 20,
        borderWidth: 1, borderTopColor: "#333", borderBottomColor: "#333"
    },

    text_label: {
        color: '#fff',
        fontSize: 16,
    },


    text_days_until: {
        color: '#f442df',
        fontSize: 64,
    },

    text_runType: {
        color: '#fff',
        fontSize: 32,
    },

    text_bpmRange: {
        color: '#fff',
        fontSize: 16,
    },

  });