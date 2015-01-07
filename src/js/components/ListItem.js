/*** @jsx React.DOM */

var moment = require('moment');

var React = require('react');
var ReactAddons = require('react-addons');
var WSAPI = require('../apis/WSAPI');

var ListItem = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    hideDates: React.PropTypes.bool,
    hideAvatars: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      text: this.props.data.text
    };
  },

  getDefaultProps: function() {
    return {
      data: {}
    };
  },

  onFieldUpdated: function(field, value) {
    this.props.onStateChange(this.props.id, field, value);
  },

  handleChecked: function(e) {
    this.onFieldUpdated('complete', e.target.checked);
  },

  updateText: function(e) {
    this.setState({
      text: e.target.value
    });
  },

  updateTaskName: function(e) {
    WSAPI.updateField(this.props.data.id, 'Name', this.state.text)
      .then(this.flairItem);
  },

  componentDidMount: function () {
    if (!this.props.data.text) {
      this.refs.input.getDOMNode().focus();
    }
  },

  flairItem: function() {
    debugger;
  },

  getAvatar: function(url) {
    var hideAvatarClass = this.props.hideAvatars ? ' hidden' : '';

    return (
      <div className="avatar">
        <span className="icon icon-user" />
      </div>
    );
  },

  getDateIcon: function(date) {
    return (
      <div className="date">
        <span className="icon icon-calendar" />
        <span className="text">{ date && this.formatDate(date) || 'assign due date' }</span>
      </div>
    );
  },

  formatDate: function(date) {
    var daysRemaining = moment(date).endOf('day').diff(moment(), 'days');

    if (daysRemaining < 0) {
      return 'Past Due (' + moment(date).format('l') + ')';
    } else if (daysRemaining === 0) {
      return 'due Today';
    } else if (daysRemaining === 1) {
      return 'due Tomorrow';
    } else {
      return 'due ' + moment(date).format('l');
    }
  },

  render: function() {
    var item = this.props.data;
    
    return (
      <div className="list-item">
        <div className="row">
          <label className="checkbox-label col-md-1">
            <input className="checkbox" type="checkbox" defaultChecked={ item.complete } onChange={ this.handleChecked } />
          </label>

          <div className="col-md-10">
            <input
              className={ "textbox complete-" + item.complete } 
              value={ this.state.text }
              placeholder="New Item" 
              onChange={ this.updateText } 
              onBlur={ this.updateTaskName }
              ref="input"
            />
          </div>

          <span className="icon icon-trash tool" />
          <span className="icon icon-pencil tool" />
        </div>


        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-11">
            { this.getAvatar(item.avatarUrl) }
            { this.getDateIcon(item.date) }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ListItem;