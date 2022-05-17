import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default function Login(){
    return(
            <View style= {styles.body}>
                <View>
                <Text style= {styles.text1}>Enjoy</Text>
                </View>
            </View>
    );

};

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor: 'lightblue',
        alignItems:'center',
        justifyContent: 'center',
    },
    text1:{

    }
});