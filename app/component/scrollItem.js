/**
 * Created by Winsky on 15/12/3.
 */
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

var ScrollItem = React.createClass({
    propTypes:{
        title:React.PropTypes.string.isRequired,
        topic:React.PropTypes.string.isRequired,
        article:React.PropTypes.string.isRequired
    },
    render:function(){
        return(
            <TouchableOpacity onPress={this._feedback}>
                <View style={styles.itemView}>
                    <View style={styles.rowView}>
                        <Text style={styles.itemTitle}>{this.props.title}</Text>
                        <Text style={styles.itemTopic}>from {this.props.topic}</Text>
                    </View>
                    <Text style={styles.itemArticle}>
                        {this.props.article}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    },
    _feedback:function(){

    }
});

var styles = StyleSheet.create({
    itemView:{
        width:375,
        height:100,
        backgroundColor:'white',
        marginBottom:10,
        shadowOpacity:0.5,
        shadowOffset:{height:3}
    },
    rowView:{
        flexDirection:'row'
    },
    itemTitle:{
        fontSize:25,
        left:10,
        top:5
    },
    itemTopic:{
        fontSize:12,
        left:30,
        top:10
    },
    itemArticle:{
        fontSize:15,
        width:335,
        height:55,
        left:20,
        top:8
    }
});

module.exports = ScrollItem;