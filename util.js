var fs = require("fs");

exports.getFileObjectFromTextFile = function(filepath,encoding){
    var textFile = fs.readFileSync(filepath,encoding);
    var stats = fs.statSync(filepath);
    var fileSizeInBytes = stats.size;
    console.log(fileSizeInBytes/1000+"Kb");
    return textFile;
}

exports.setPositionOfOccurence=function(charMap,position){
    charMap.positionOfOccurence.push(position);
    return charMap;
}

exports.getFileSize = function(filepath){
    console.log(fs.statSync(filepath).size/1000+"Kb");
}