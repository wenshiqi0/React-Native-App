/**
 * Created by Winsky on 15/11/29.
 */
'use strict'

var Pitcher = require('./component/pitcher');

var React = require('react-native');
var {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Animated
} = React;

/*
  0 -> Question
  1 -> Description
  2 -> Topic
 */

var TextInputAnimated = Animated.createAnimatedComponent(TextInput);
var NavigationButton = require('./component/navigationButton');

var Editor = React.createClass({
    propTypes:{
        touchNavigation:React.PropTypes.func.isRequired,
        covered:React.PropTypes.bool.isRequired,
        opacity:React.PropTypes.object.isRequired
    },
    getInitialState:function(){
        return{
            option: 0,
            anonymity: false,
            editedText: new Array(3),
            hrMove: new Animated.Value(0),
            inputHeight: new Animated.Value(537)
        }
    },
    render: function(){

        var cover = this.props.covered ? (<Animated.View key={'editorCover'}
                                                         style={[styles.cover,{opacity:this.props.opacity}]}/>) : undefined;

        return (
          <View>

              <View style={[styles.container,this.props.style]}>

                  <View style={styles.header}>
                      <NavigationButton touchButton={this._touchNavigation} />
                      <Text style={styles.headerTitle}>Add Question</Text>
                      <TouchableOpacity onPress={this._publish}>
                          <Text style={styles.headerPublish}>Publish</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.controller}>
                      <TouchableOpacity onPress={this._tapQuestion}>
                          <Text style={(this.state.option === 0)?styles.controlTouchButton:styles.controlUnTouchButton}>
                              Question
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this._tapDescription}>
                          <Text style={(this.state.option === 1)?styles.controlTouchButton:styles.controlUnTouchButton}>
                              Description
                          </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this._tapTopic}>
                          <Text style={(this.state.option === 2)?styles.controlTouchButton:styles.controlUnTouchButton}>
                              Topic
                          </Text>
                      </TouchableOpacity>
                  </View>

                  <Animated.View
                      style={[
                    styles.controlHr,
                    {transform:[{translateX:this.state.hrMove}]}
                  ]}/>

                  <TextInputAnimated
                      style={[styles.articleInput,{height: this.state.inputHeight}]}
                      multiline={true}
                      autoCapitalize={'words'}
                      onChangeText={this._onTextChange}
                      value={this.state.editedText[this.state.option]}
                      onFocus={this._onFocus}
                      onBlur={this._onBlur}/>

                  <View style={styles.anonymityController}>
                      <Pitcher
                          pitched={this.state.anonymity}
                          style={styles.anonymityPitcher}
                          getPitchedBool={this._getAnonimityBool}/>
                      <Text style={styles.anonymityText}>Anonymity</Text>
                  </View>
              </View>

              {cover}

          </View>
        )
    },
    _getAnonimityBool:function(b){
        this.setState({
            anonymity:b
        });
    },
    _tapQuestion:function(){
        this.setState({
            option:0
        });
        Animated.spring(
            this.state.hrMove,
            {toValue:0}
        ).start();
    },
    _tapDescription:function(){
        this.setState({
            option:1
        });
        Animated.spring(
            this.state.hrMove,
            {toValue:70}
        ).start();
    },
    _tapTopic:function(){
        this.setState({
            option:2
        });
        Animated.spring(
            this.state.hrMove,
            {toValue:131}
        ).start();
    },
    _onTextChange:function(text){
        var editingText = this.state.editedText;
        editingText[this.state.option] = text;
        this.setState(
            {editedText:editingText}
        );
    },
    _onFocus:function() {
        Animated.spring(
            this.state.inputHeight,
            {
                toValue:277,
                duration:800
            }
        ).start();
    },
    _onBlur:function(){
        Animated.timing(
            this.state.inputHeight,
            {
                toValue:537,
                duration:800
            }
        ).start();
    },
    _publish:function(){
        fetch('http://localhost:8000/question:2', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:this.state.editedText[0],
                description:this.state.editedText[1],
                topic:this.state.editedText[2]
            })
        })
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
    //Header CSS
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
    headerPublish:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: 'white',
        marginTop: 11,
        marginLeft: 160
    },
    //Controller CSS
    controller:{
        backgroundColor: '#63B8FF',
        width: 375,
        height: 30,
        flexDirection: 'row',
    },
    controlUnTouchButton:{
        backgroundColor: 'transparent',
        color: 'grey',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 12,
        paddingTop: 4
    },
    controlTouchButton:{
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 12,
        paddingTop: 4
    },
    controlHr:{
        backgroundColor: 'grey',
        height: 2,
        width: 50,
        left: 12,
        shadowOpacity: 20,
        shadowColor: 'black',
    },
    //TextInput CSS
    articleInput:{
        width: 355,
        fontSize: 15,
        alignSelf:'center'
    },
    //Anomymity CSS
    anonymityController:{
        backgroundColor: '#E0E0E0',
        width: 375,
        height: 40,
        flexDirection: 'row'
    },
    anonymityPitcher:{
        top:9,
        left:5
    },
    anonymityText:{
        left:10,
        top:5,
        fontSize:20,
        color: 'black',
        height:30
    }
});

module.exports = Editor;