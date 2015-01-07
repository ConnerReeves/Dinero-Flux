var _ = require('lodash');

var DataActionCreators = require('../actions/DataActionCreators');
var DataStore = require('../stores/DataStore.js');

module.exports = {

  getFeatures: () => {
    var fetch = ['c_DueDate', 'Name', 'Owner', 'ScheduleState'];
    
    Ext.create('Rally.data.WsapiDataStore', {
      limit: Infinity,
      model: 'PortfolioItem/Feature',
      fetch: fetch
    }).load({
      callback: (features) => {
        _.each(features, (feature) => {
          feature.getCollection('UserStories').load({
            fetch: fetch,
            callback: (stories) => {
              var featureData = feature.data;
              featureData.UserStories = _.pluck(stories, 'data');
              DataActionCreators.receiveFeature(featureData);
            },
            scope: this
          })
        }, this);
      },
      scope: this
    });
  },

  updateField: (id, fieldName, value) => {
    console.log('Updating ' + id + ': [' + fieldName + '] ' + value);

    return new Promise((resolve, reject) => {
      Rally.data.ModelFactory.getModel({
        type: 'UserStory',
        success: (model) => {
          model.load(id, {
              fetch: [value],
              callback: (record, operation) => {
                // record.set(fieldName, value);
                record.save({
                  callback: (result, operation) => {
                    if (operation.wasSuccessful()) {
                      resolve();
                    }
                  }
                });
              }
          });
        }
      });
    });
  }

};