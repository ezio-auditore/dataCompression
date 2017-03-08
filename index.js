var util =require("./util");
var fs = require("fs");
var staticMap = require("./staticMap");
var outputFile = "";
var charMap = require("./characterMap");
String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
if(process.argv[3]=='encode'){
    var fileObject =util.getFileObjectFromTextFile(process.argv[2],'UTF-8');
var file = fs.readFileSync(process.argv[2]);
var fileString=fileObject.toString();

outputFile='output_encoded.txt';
    var encodingBuffer = new Buffer(file.toString(),'UTF-8');
    
    var spaceArray=[];
    var newlineArray=[];
    for(var i =0;i<fileString.length-1;i++){
        if(fileString.charAt(i) == ' '){
            
            spaceArray.push(i);
        }
        if(fileString.charAt(i) == '\n'){
            
            newlineArray.push(i);
        }
    }
    //console.log(spaceArray);
    // console.log(newlineArray);
    var spaceString = spaceArray.reduce(function(a,b){
        return a+'+'+b;
    },'');
    var newlineString = newlineArray.reduce(function(a,b){
        return a+'+'+b;
    },'');
    //console.log(spaceString);
    //console.log(newlineString);
    //console.log(encodingBuffer+'/'+spaceString+'/'+newlineString);
    fs.writeFileSync(outputFile,encodingBuffer+'/'+spaceString+'/'+newlineString,'base64');
}
else if(process.argv[3]=='decode'){
var fileObject =util.getFileObjectFromTextFile(process.argv[2],'base64');
    
    console.log(fileObject);
    var fileString=fileObject.toString('UTF-8');
    var spaceArray=[];
    var newlineArray=[];
    newlineArray=fileString.substr(fileString.lastIndexOf('/'),fileString.length-1).split('+');
    newlineArray[0] = newlineArray[0].substr(1,newlineArray.length);
    spaceArray =fileString.split('/')[1].split('+');
    newlineArray.splice(0,1);
    spaceArray.splice(0,1);
    console.log(newlineArray);
    console.log(spaceArray);
    outputFile='output_decoded.txt';
    fileString= fileString.substr(0,fileString.indexOf('/'));
    for(var i=0;i<spaceArray.length;i++){
        console.log(fileString.splice(spaceArray[i],0,' '));
        fileString.splice(spaceArray[i],0,' ');
    }
    
    for(var i=0;i<newlineArray.length;i++){
        console.log(fileString.splice(newlineArray[i],0,' '));
         fileString.splice(newlineArray[i],0,'\n');
    }
    
   
    console.log(fileString);
    var decodingBuffer = new Buffer(fileString.toString('base64'),'UTF-8');
    console.log(decodingBuffer);
    fs.writeFileSync(outputFile,decodingBuffer,'UTF-8');
}

util.getFileSize(outputFile);


