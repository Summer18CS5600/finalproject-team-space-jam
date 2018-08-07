var mongoose = require('mongoose');
var ProcessSchema = require('./process.schema.server');
var ProcessModel = mongoose.model("ProcessModel", ProcessSchema);

ProcessModel.createProcess = createProcess;
ProcessModel.findProcessByPid = findProcessByPid;
ProcessModel.updateProcess = updateProcess;

module.exports = ProcessModel;

/* Create a new Process */
function createProcess(process) {
  return ProcessModel.create(process);
}

/* Find a Process which matches the given ID */
function findProcessByPid(pid) {
  return ProcessModel.findOne({pid: pid});
}

/* Update the process which matches the given ID to the new process */
function updateProcess(pid, process) {
  var i = null;
  var ProcessCache = null;
  return ProcessModel.findProcessByPid(pid)
    .then(function (process1) {
      ProcessCache = process1.processCache;
      for(let j = 0; j < 10; j++) {
        if(ProcessCache[j].value == process['value']) {
          i = j;
        }
      }
      //process1.splice(i, 1, process);
      ProcessCache.splice(i, 1, process);
      //console.log(ProcessCache);
      process1.processCache = ProcessCache;
      return process1.save();
    });
  //return ProcessModel.update({pid: pid}, process);
}
