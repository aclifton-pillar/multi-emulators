import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';

const App = props => {
    const [time, setTime] = useState(props.currentTime);
    return (<View style={styles.container}>
        <Text testID="welcome" style={styles.welcome}>Hello!</Text>
        <Button
            onPress={() => setTime(props.getCurrentTime)}
            title="Click for Time"
            testID="getTime"
        />
        {time &&
        <Text testID="time">{'Current Time: ' + time}</Text>
        }
    </View>);
};

App.propTypes = {
    currentTime: PropTypes.string,
    getCurrentTime: PropTypes.func
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
