/**
 * Created by Winsky on 15/12/1.
 */
var React = require('react-native');

var {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
}=React;

var NavigationButton = React.createClass({
    propTypes:{
        touchButton:React.PropTypes.func.isRequired
    },
    render:function(){
        return(
            <TouchableOpacity onPress={this._onPress}>
                <Image
                    style={styles.naviButton}
                    source={require('./../image/Plus.png')}/>
            </TouchableOpacity>
        )
    },
    _onPress:function(){
        this.props.touchButton()
    }
});

var styles = StyleSheet.create({
    naviButton:{
        width:30,
        height:30,
        top:5,
        left:2
    }
});

module.exports = NavigationButton;