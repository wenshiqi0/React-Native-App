/**
 * Created by Winsky on 15/11/29.
 */
'use strict'

var React = require('react-native');

var {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image
} = React;

var check = require('./../image/Check.png');

var Pitcher = React.createClass({
    propTypes:{
        pitched:React.PropTypes.bool.isRequired,
        getPitchedBool:React.PropTypes.func.isRequired
    },
    getInitialState:function(){
        return {
            pitched:this.props.pitched
        }
    },
    render:function(){
        return (
            <TouchableWithoutFeedback
                onPress={this._pitchFunc}>
                <View style={[
                    styles.pitcher,
                    this.props.style]} >
                    <Image
                        style={styles.pitcherCheck}
                        source={this.state.pitched ? check : undefined} />
                </View>
            </TouchableWithoutFeedback>
        )
    },
    _pitchFunc:function(){
        this.setState({
            pitched:(this.state.pitched ? false :true)
        })
        this.props.getPitchedBool(this.state.pitched);
    }
});

var styles = StyleSheet.create({
    pitcher:{
        borderWidth: 2,
        width:20,
        height:20,
        borderColor: 'black',
    },
    pitcherCheck:{
        width:16,
        height:16
    }
});

module.exports = Pitcher;