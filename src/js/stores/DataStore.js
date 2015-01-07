var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var _data = {
  items: [{
    Name: 'Mock To-Do List',
    UserStories: [{
      Name: 'Task 0',
      c_DueDate: new Date('2015-1-3')
    },{
      Name: 'Task 1',
      c_DueDate: new Date('2015-1-6')
    },{
      Name: 'Task 2',
      c_DueDate: new Date('2015-1-7')
    },{
      Name: 'Task 3',
      c_DueDate: new Date('2020-1-1')
    }]
  }]
};

var DataStore = merge(EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(AppConstants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(AppConstants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(AppConstants.CHANGE_EVENT);
  },

  _getListItemData: function(item) {
    return {
      id: item.ObjectID,
      text: item.Name,
      complete: item.ScheduleState === 'Accepted',
      date: item.c_DueDate
    };
  },

  getListItems: function() {
    return _.map(_data.items, function(item) {
      var parsedItem = this._getListItemData(item);
      parsedItem.items = _.map(item.UserStories, this._getListItemData, this);
      return parsedItem;
    }, this);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case AppConstants.ActionTypes.RECEIVE_ITEM:
        _data.items.push(action.item);
        DataStore.emitChange();
        break;
    }
  })

});

module.exports = DataStore;