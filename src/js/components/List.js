/*** @jsx React.DOM */

var _ = require('lodash');

var React = require('react');
var ReactAddons = require('react-addons');
var ListItem = require('./ListItem');

var List = React.createClass({
  getInitialState: function() {
    return {
      expanded: true,
      newItem: false
    }
  },

  render: function() {
    var panelId = _.uniqueId('panel-');
    var uncompletedItems = _.filter(this.props.items, { complete: false });
    var completedItems = _.filter(this.props.items, { complete: true });

    return (
      <div className="list panel-group">
        <div className="panel">
          <div className="panel-heading" data-toggle="collapse" data-target={ '#' + panelId } onClick={ this.toggleState.bind(this, 'expanded') }>
            <h4 className="panel-title">
                <span>{ this.props.text }</span>
                <span className={ this.getChevronIconClasses() }></span>
            </h4>
          </div>
          <div id={ panelId } className={ this.getPanelClasses() }>
            <div className="panel-body">
              { _.map(uncompletedItems, this.createListItemElement) }
              { this.state.newItem ? this.createListItemElement() : this.getAddNewButton() }
            </div>
          </div>
        </div>
      </div>
    );
  },

  createListItemElement: function(item, onChangeFn) {
    return (
      <ListItem
        data={ item }
        hideAvatars={ this.props.hideAvatars }
        onStateChange={ this.props.onStateChange } 
        hideDates={ this.props.hideDates }
      />
    );
  },

  getChevronIconClasses: function() {
    return ReactAddons.classSet({
      'icon': true,
      'icon-chevron-up': this.state.expanded,
      'icon-chevron-down': !this.state.expanded,
      'pull-right': true
    });
  },

  getPanelClasses: function() {
    return ReactAddons.classSet({
      'panel-collapse': true,
      'collapse': true,
      'in': this.state.expanded
    })
  },

  getAddNewButton: function() {
    return (
      <button type="button" className="btn btn-default btn-sm add-new" onClick={ this.addNewItem }>
        <span className="icon icon-add"></span> Add New
      </button>
    );
  },

  addNewItem: function() {
    this.toggleState('newItem');
  },

  toggleState: function(key) {
    var newState = {};
    newState[key] = !this.state[key];
    this.setState(newState);
  }
});

module.exports = List;