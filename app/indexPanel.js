/**
 * Created by Winsky on 15/11/30.
 */
var React = require('react-native');
var Button = require('./component/button');

var {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated
} = React;

/*
    0 -> Home
    1 -> Discovery
    2 -> Follow
    3 -> Collection
    4 -> Question
    5 -> Setting
    6 -> Theme
 */

var buttons = [
    'Home',
    'Discovery',
    'Follow',
    'Collection',
    'Question',
    'Setting',
    'Theme'
]

var buttonImg = [
    require('./image/Home.png'),
    require('./image/Discovery.png'),
    require('./image/Follow.png'),
    require('./image/Collection.png'),
    require('./image/Question.png'),
    require('./image/Setting.png'),
    require('./image/Theme.png')
]

var IndexPanel = React.createClass({
    propTypes:{
        route:React.PropTypes.func.isRequired,
        gesture:React.PropTypes.object.isRequired,
        routeUrl:React.PropTypes.string.isRequired
    },
    getInitialState:function(){
        return{
            option:0
        }
    },
    render: function(){
        var index = new Array();
        var setting = new Array();

        for(var i in buttons){
            var oneButton = (
                <Button
                    key={'index-'+buttons[i]}
                    touched={buttons[i] === this.props.routeUrl ? true : false}
                    source={buttonImg[i]}
                    style={styles.button}
                    text={buttons[i]}
                    getButtonText={this._oneTouch}/>
            )
            index.push(oneButton);
            if(buttons[i] === 'Question'){
                index.push(<View key={'index-hr'} style={styles.hr} />);
            }
        }

        return (
            <Animated.View
                style={[this.props.style,styles.indexPanel]}
                {...this.props.gesture.panHandlers}>
                <View style={styles.infoPanel} />
                {index}
            </Animated.View>
        )
    },
    _oneTouch:function(text){
        this.props.route(text);
    }
});

var styles = StyleSheet.create({
    indexPanel:{
        width:300,
        height:667,
        backgroundColor:'white'
    },
    infoPanel:{
        width:300,
        height:200,
        backgroundColor:'#63B8FF'
    },
    button:{
        width:300,
        height:50,
    },
    hr:{
        width:300,
        height:2,
        backgroundColor:'#BA55D3',
        marginTop:10,
        marginBottom:10
    }
})


module.exports = IndexPanel;