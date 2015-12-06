/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
} = React;

var Home = require('./app/home');
var Editor = require('./app/editor');
var Setting = require('./app/setting');
var IndexPanel = require('./app/indexPanel');

var last = React.createClass({
  mainPanResponder:{},
  getInitialState: function(){
    return{
      indexPanelMoved:false,
      indexPanelMove:new Animated.Value(0),
      coverOpacity:new Animated.Value(0.0),
      routeUrl:'Home'
    }
  },

  /*
   <Editor
      touchNavigation={this._touchNavigation}
      covered={this.state.indexPanelMoved}
      opacity={this.state.coverOpacity}/>
   */

  render: function() {

    var children = new Map();

    children.set('Home',(
        <Home
            key={'homePage'}
            touchNavigation={this._touchNavigation}
            covered={this.state.indexPanelMoved}
            opacity={this.state.coverOpacity}/>
    ));

    children.set('Question',(
        <Editor
            key={'editorPage'}
            touchNavigation={this._touchNavigation}
            covered={this.state.indexPanelMoved}
            opacity={this.state.coverOpacity}/>
    ));

    children.set('Setting',(
        <Setting
            key={'settingPage'}
            touchNavigation={this._touchNavigation}
            covered={this.state.indexPanelMoved}
            opacity={this.state.coverOpacity}/>
    ));

    return (
      <View style={styles.container}>
        {children.get(this.state.routeUrl)}

        <IndexPanel
            style={[
                styles.indexPanel,
                {transform:[{translateX:this.state.indexPanelMove}]}
              ]}
            gesture={this.mainPanResponder}
            route={this._route}
            routeUrl={this.state.routeUrl}/>
      </View>
    );
  },
  componentWillMount: function(){
    this.mainPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dy === 0 || (gestureState.dx / Math.abs(gestureState.dy)) < (-10)){
          Animated.parallel([
            Animated.timing(
                this.state.indexPanelMove,
                {toValue: 0}
            ),
            Animated.timing(
                this.state.coverOpacity,
                {toValue:0.0}
            ),
          ]).start(()=>{
            this.setState({indexPanelMoved:false});
          });
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => {return true;},
    });
  },
  _touchNavigation:function(){
    Animated.parallel([
      Animated.timing(
          this.state.indexPanelMove,
          {toValue: 300}
      ),
      Animated.timing(
          this.state.coverOpacity,
          {toValue:0.5}
      ),
    ]).start();

    this.setState({indexPanelMoved:true});
  },

  /*
   0 -> Home
   1 -> Discovery
   2 -> Follow
   3 -> Collection
   4 -> Question
   5 -> Setting
   6 -> Theme
   */
  _route:function(text) {
    this.setState({
      routeUrl:text
    });
    Animated.parallel([
      Animated.timing(
          this.state.indexPanelMove,
          {toValue: 0}
      ),
      Animated.timing(
          this.state.coverOpacity,
          {toValue:0.0}
      ),
    ]).start(()=>{
      this.setState({indexPanelMoved:false});
    });
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  indexPanel:{
    left:-675
  }
});

AppRegistry.registerComponent('last', () => last);
