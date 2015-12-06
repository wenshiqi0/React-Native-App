/**
 * Created by Winsky on 15/11/30.
 */
var React = require('react-native');

var{
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
} = React;

var Button = React.createClass({
    propTypes:{
        touched:React.PropTypes.bool.isRequired,
        getButtonText:React.PropTypes.func.isRequired
    },
    render:function(){
        return(
            <TouchableOpacity onPress={this._feedback}>
                <View style={[
                    this.props.style,
                    styles.button,
                    {backgroundColor:(this.props.touched ? '#E8E8E8' : 'white')}]}>
                    <Image style={styles.buttonImage} source={this.props.source} />
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    },
    _feedback:function(){
        this.props.getButtonText(this.props.text);
    }
});

var styles = StyleSheet.create({
    button:{
        flexDirection:'row'
    },
    buttonImage:{
        width:40,
        height:40,
        left:5,
        top:5
    },
    buttonText:{
        backgroundColor:'transparent',
        fontSize:20,
        top:12,
        left:12
    }
});

module.exports = Button;