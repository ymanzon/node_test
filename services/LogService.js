const {
  UserEventLogModel,
  UserEventLogView,
} = require("../models/user-event-log");

const UpdateAction = async (message, user_id, module) => {
  await UserEventLogModel.create({module:module, user_action:"UPDATE", user_id:user_id,event_content: JSON.stringify(message)});
};

const CreateAction = async (message, user_id, module) => {
  await UserEventLogModel.create({module:module, user_action:"CREATE", user_id:user_id,event_content:  JSON.stringify(message) } );
};

const DeleteAction =async  (message, user_id, module) => {
  await UserEventLogModel.create({module:module, user_action:"DELETE", user_id:user_id,event_content: JSON.stringify(message)});
};

const RetriveAction = async  (message, user_id, module) => {
    await UserEventLogModel.create({module:module, user_action:"RETRIVE", user_id:user_id,event_content: JSON.stringify(message)});
  };

/*
const Warn = (message ) => {
    //register log success
}*/

module.exports = { CreateAction, RetriveAction, UpdateAction, DeleteAction };
