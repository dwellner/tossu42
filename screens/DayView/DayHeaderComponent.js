import React from "react";
import PropTypes from "prop-types";
import Formatters from "../../utils/Formatters";

import {
    StyleSheet,
    Text,
    View,
    Button,
  } from 'react-native';

const nextDate = (date,delta) => {
    const result = new Date(date);
    result.setDate(new Date(date).getDate() + delta);
    return result.toISOString().substr(0,10); 
}

export default class DayHeaderComponent extends React.Component {
    static propTypes = {
        date : PropTypes.string.isRequired,
        changeDate: PropTypes.func.isRequired
    };


    render() {
        const {date, changeDate} = this.props;

        return (
            <View style={styles.component}>
                <View style={{flex: 1, flexDirection: "row"}}>

                    <View style={{flex: 1}}>
                        <Button title="<" onPress={() => changeDate(nextDate(date, -1))}/>
                    </View>
                    <View style={{flex: 4, alignItems: "center"}}>
                        <Text style={styles.text_date}>{Formatters.dateToDayLabel(date)}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Button title=">" onPress={() => changeDate(nextDate(date, 1))}/>
                    </View>
                </View>

                <View style={{flex: 1, padding: 10, borderWidth: 1, borderTopColor: "#333", borderBottomColor: "#333", alignItems: "center"}}>
                <View style={{flex: 1, flexDirection: "row"}}>
                        <Text style={styles.text_days_until}>233</Text>
                        <Text style={styles.text_label}>päivää ennen</Text>
                </View>
                <Text style={styles.text_targetName}>Helsinki City Maraton - 19.5.2019</Text>
                </View>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    component: {
        alignItems: "center",  
        alignItems: 'stretch',
    },
    text_days_until: {
      color: '#f442df',
      fontSize: 16,
      fontWeight: 'bold'   

    },
    text_date: {
        color: '#fff',
        fontSize: 24,
    },
    text_label: {
        color: '#fff',
        textAlignVertical: 'center',
        fontSize: 16,
        marginLeft: 4
    },
    text_targetName: {
        color: '#fff',
        fontSize: 16,   
        fontWeight: '900'   
    },

});
 