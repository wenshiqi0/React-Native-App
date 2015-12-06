/**
 * Created by Winsky on 15/12/1.
 */
var React = require('react-native');

var {
    View,
    Text,
    ScrollView,
    Animated,
    StyleSheet
} = React;

var NavigationButton = require('./component/navigationButton');
var ScrollItem = require('./component/scrollItem');

var Home = React.createClass({
    getInitialState:function(){
        return{
            children:new Array()
        }
    },
    render:function(){

        var cover = this.props.covered ? (<Animated.View key={'homeCover'}
                                                         style={[styles.cover,{opacity:this.props.opacity}]}/>) : undefined;

        return(
            <View>

                <View style={[styles.container,this.props.style]}>

                    <View style={styles.header}>
                        <NavigationButton touchButton={this._touchNavigation} />
                        <Text style={styles.headerTitle}>Home Page</Text>
                    </View>

                    {this.state.children}

                </View>

                {cover}

            </View>
        )
    },
    componentWillMount:function(){
        this._getListSource()
    },
    _touchNavigation:function(){
        this.props.touchNavigation()
    },
    _getListSource(){
        fetch('http://localhost:8000/question:2',{
            method:'GET'
        })
            .then((response) => {
                var str = response._bodyText;
                var json = JSON.parse(str);
                var children = this.state.children;
                children.push(<ScrollView key={json.key} style={styles.scrollView}>
                                <ScrollItem title={json.title} topic={json.topic} article={json.description} />
                              </ScrollView>);
                this.setState({
                    children:children
                });
            })
            .catch((error) => {
                console.warn(error);
            });
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
    },
    scrollView:{
        width:375,
        height:607,
        backgroundColor:'#E8E8E8'
    }
});

module.exports = Home;

