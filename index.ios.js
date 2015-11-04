/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TestLog = require('NativeModules').TestObject

TestLog.logNew('wenshiqi');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Image,
  ListView,
  TextInput
} = React;

var TextInputAnimated = Animated.createAnimatedComponent(TextInput);
var ListViewAnimated = Animated.createAnimatedComponent(ListView);

var test = React.createClass({
  mainPanResponder:{},
  render: function(){

    var textInput = (
      <TextInputAnimated
        style={{marginLeft:-7,marginTop:5,paddingLeft:10,paddingRight:10,
                width:320,height:40,top:-550,
                borderColor:'gray',borderWidth: 1,borderRadius:12,
                alignSelf:'center',
                opacity:this.state.searchBarOpacity,
                transform:[{
                  translateY:this.state.searchBarMove
                }]
              }}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}/>
    );

    return (
      <Animated.View
        style={[styles.container,this.state.mainViewMove.getLayout()]}>

        <View style={styles.contentView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={this.moreIconPress}>
              <Image
                style={
                  [styles.moreIcon,{
                    transform:[{rotate:this.state.searchRotate+'deg'}]
                  }]
                }
                source={require('image!more')} />
            </TouchableOpacity>
            <Text style={styles.headerText}>首页</Text>
            <TouchableOpacity onPress={this.searchIconPress}>
              <Image style={styles.searchIcon} source={require('image!search')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addIconPress}>
              <Image style={styles.addIcon} source={require('image!notification1')} />
            </TouchableOpacity>
          </View>

          <ListViewAnimated
            style={[
              this.state.touchToSearch ? styles.touchToShow : styles.touchNotToShow
            ]}
            dataSource={this.state.dataSource}
            renderRow={this._renderList}
            {...this.mainPanResponder.panHandlers}/>

          {this.state.touchToSearch ? textInput : null}
        </View>

        <View style={styles.moreView}>
          <View style={styles.moreViewHeader}/>

          <View style={styles.moreViewButtons}>
            <TouchableOpacity>
              <View style={styles.moreViewButton}>
                <Text>Button1</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.moreViewButton}>
                <Text>Button2</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.moreViewButton}>
                <Text>Button3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.hr1}/>

          <View style={styles.moreViewButtons}>

            <TouchableOpacity>
              <View style={styles.moreViewButton}>
                <Text>Setting</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.moreViewButton}>
                <Text>About</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.addView} />

      </Animated.View>
    );
  },
  _renderList:function(rowData){
    return (
      <View style={styles.listRow}>
        <View style={styles.listContent}>
          <Text style={styles.listTitle}>{rowData}</Text>
          <Text style={styles.listArtical}>
            To access the in-app developer menu:On iOS shake the device or press control + ⌘ + z in
            the simulator.On Android shake the device or press hardware menu button (available on older
            devices and in most of the emulators, e.g. in genymotion you can press ⌘ + m to simulate
            hardware menu button click)
          </Text>
        </View>
        <View style={styles.hr} />
      </View>
    )
  },
  getInitialState: function(){
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => {r1 !== r2}});

    return {
      searchRotate:0,
      mainViewMove:new Animated.ValueXY(0),
      dataSource:ds.cloneWithRows(['row1','row2','row3','row4','row5']),
      touchToSearch:false,
      searchBarMove:new Animated.Value(-20),
      searchBarOpacity:new Animated.Value(0),
      listViewMove:new Animated.Value(0),
      text:'wenshiqi'
    }
  },
  componentDidMount: function(){

  },
  componentWillMount: function(){
    this.mainPanResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
        this.setState({searchRotate:0})
        Animated.spring(
          this.state.mainViewMove,
          {toValue:{x:0,y:0}}
        ).start();
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  },
  moreIconPress:function(){
    this.setState({searchRotate:90});
    Animated.spring(
      this.state.mainViewMove,
      {toValue:{x:250,y:0}}
    ).start();
  },
  addIconPress:function(){
    Animated.spring(
      this.state.mainViewMove,
      {toValue:{x:-250,y:0}}
    ).start();
  },
  searchIconPress:function(){
    if(!this.state.touchToSearch){
      this.setState({touchToSearch:true});
      Animated.parallel([
        Animated.spring(
          this.state.searchBarOpacity,
          {toValue:1}
        ),
        Animated.timing(
          this.state.searchBarMove,
          {toValue:0}
        ),
      ]).start();
    }else{
      Animated.parallel([
        Animated.spring(
          this.state.searchBarOpacity,
          {toValue:0}
        ),
        Animated.timing(
          this.state.searchBarMove,
          {toValue:-20}
        ),
      ]).start( () => {
        this.setState({touchToSearch:false});
      } );
    }
  }
});

var styles = StyleSheet.create({
  container:{
    flex:1,
    alignSelf:'flex-start',
    paddingTop:18,
    flexDirection:'row',
  },
  header:{
    width:380,
    height:50,
    backgroundColor:'red',
    flexDirection:'row'
  },
  headerText:{
    fontSize:25,
    color:'white',
    paddingTop:12,
    paddingLeft:10
  },
  moreIcon:{
    width:40,
    height:40,
    marginTop:5,
    marginLeft:2,
    backgroundColor:'transparent',
  },
  searchIcon:{
    width:40,
    height:40,
    marginTop:5,
    marginLeft:185,
    backgroundColor:'transparent',
  },
  addIcon:{
    width:40,
    height:40,
    marginTop:5,
    marginLeft:5,
    backgroundColor:'transparent',
  },
  hr:{
    backgroundColor:'grey',
    height:1,
    width:360,
    alignSelf:'center',
    marginLeft:7
  },
  hr1:{
    backgroundColor:'black',
    height:1,
    width:260,
    alignSelf:'center',
  },
  listRow:{
    paddingTop:10,
  },
  listContent:{
    paddingLeft:15,
    width:360,
    alignSelf:'center'
  },
  listTitle:{
    fontSize:20
  },
  listArtical:{
    fontSize:15,
    color:'grey',
    marginRight:10,
    marginLeft:10,
    alignSelf:'center'
  },
  moreView:{
    flexDirection:'column',
    width:260,
    height:720,
    backgroundColor:'grey',
    left:-640
  },
  moreViewHeader:{
    width:260,
    height:160,
    backgroundColor:'blue',
  },
  moreViewButtons:{
    marginTop:20,
    marginBottom:20
  },
  moreViewButton:{
    alignItems:'center',
    justifyContent:'center',
    width:260,
    height:40,
  },
  addView:{
    width:260,
    height:720,
    backgroundColor:'yellow',
    left:-260
  },
  contentView:{
    flexDirection:'column',
  },
  touchToShow:{
    marginBottom:-45
  },
  touchNotToShow:{
    paddingTop:0
  }
})

AppRegistry.registerComponent('test', () => test);
