//main publisher subscriber class
function publisherSubcriber(){

    //subscriber array, in this array we keep all subscribers for events
    const subscribers = {}

    //pass the given data to all subscribers registered for the given event
    function publish(eventName, data) {
        if (!Array.isArray(subscribers[eventName]))
            return


        subscribers[eventName].forEach((callback) => {
            callback(data)
            }
        )
    }
// register subscribe for given event
    function subscribe(eventName, callback){
      // if no subscriber registered for event then make this event parameter Array to keep subscribers
        if (!Array.isArray(subscribers[eventName])){
            subscribers[eventName] = []
        }

        //register subscriber
        subscribers[eventName].push(callback)
    }

    return {
        publish,
        subscribe
    }
}

//subscriber which prints collection of values
function printFileNames(files){
    files.forEach(f => {console.log(f)})
}

//main publisher and subscriber class
const ps = publisherSubcriber()

//local variable for keeping file names in folder
var fileNames = [];

//folder location to print all files names contains
var folderName = 'c:/test/';
var fs = require('fs');

//read all file names in folder and add them to the fileNames variable
fs.readdir(folderName, (err, files) => {
  files.forEach(file => {
    fileNames.push(file);
  });
});

//subscribe the printFileNames to the "print-filenames" event
ps.subscribe('print-filenames', printFileNames);

//publish the event
ps.publish('print-filenames', fileNames);
