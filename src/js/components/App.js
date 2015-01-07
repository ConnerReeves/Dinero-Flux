/*** @jsx React.DOM */

var React = require('react');
var DataStore = require('../stores/DataStore');
var ActionCreator = require('../actions/DataActionCreators');
var WSAPI = require('../apis/WSAPI');
var List = require('./List');

var App = React.createClass({
  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
    Rally.onReady(this._onRallyReady);
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return {
      listItems: []
    };
  },

  _onRallyReady: function() {
    WSAPI.getFeatures();
  },

  _onChange: function() {
    this.setState({
      listItems: DataStore.getListItems()
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          { _.map(this.state.listItems, List) }
        </div>
      </div>
    );
  }
});

module.exports = App;
