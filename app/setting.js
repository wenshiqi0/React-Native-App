/**
 * Created by Winsky on 15/12/1.
 */
/**
 * Created by Winsky on 15/12/1.
 */
var React = require('react-native');

var {
    View,
    Text,
    ListView,
    Animated,
    StyleSheet
    } = React;

var NavigationButton = require('./component/navigationButton');

var Home = React.createClass({
    render:function(){

        var cover = this.props.covered ? (<Animated.View key={'homeCover'}
                                                         style={[styles.cover,{opacity:this.props.opacity}]}/>) : undefined;

        return(
            <View>

                <View style={[styles.container,this.props.style]}>

                    <View style={styles.header}>
                        <NavigationButton touchButton={this._touchNavigation} />
                        <Text style={styles.headerTitle}>Setting</Text>
                    </View>

                </View>

                {cover}

            </View>
        )
    },
    _touchNavigation:function(){
        this.props.touchNavigation()
    }
});

var styles = StyleSheet.create({
    container:{
        width: 375,
        height: 647,
        alignSelf: 'flex-start',
        flexDirection: 'column'
    },
    cover:{
        width: 375,
        height: 647,
        backgroundColor: 'black',
        top: -647
    },
    header:{
        width: 375,
        height: 40,
        backgroundColor: '#63B8FF',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    headerTitle:{
        backgroundColor: 'transparent',
        fontSize: 20,
        color: 'white',
        marginTop: 7,
        marginLeft: 7
    }
});

module.exports = Home;

