var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var DataStore = require('../stores/DataStore');

module.exports = {

  receiveFeature: function(feature) {
    AppDispatcher.handleViewAction({
      type: AppConstants.ActionTypes.RECEIVE_ITEM,
      item: feature
    });
  }

};
