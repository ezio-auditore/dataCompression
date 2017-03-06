var util =require("./util");
var fs = require("fs");

var outputFile = "";
var charMap = require("./characterMap");
if(process.argv[3]=='encode'){
    var fileObject =util.getFileObjectFromTextFile(process.argv[2],'UTF-8');

var fileString=fileObject.toString();
var count =1;
outputFile='output_encoded.txt';
for(var i=0;i<fileString.length;i++){
    
    if(fileString.charAt(i)===fileString.charAt(i+1)){
        count++;
    }
    else if(fileString.charAt(i)!=fileString.charAt(i+1)){
        fs.appendFileSync(outputFile,fileString.charAt(i)+count);
        count =1;
    }
}
}
else if(process.argv[3]=='decode'){
var fileObject =util.getFileObjectFromTextFile(process.argv[2],'UTF-8');
    
    console.log(fileObject);
    var fileString=fileObject.toString();
    
    outputFile='output_decoded.txt';
    for(var i=0;i<fileString.length;i+=2){
        var temp = parseInt(fileString.charAt(i+1),10);
        console.log(temp)
        var output='';
        while(temp!=0){
            output+=fileString.charAt(i);
            --temp;
        }
        fs.appendFileSync(outputFile,output);
    }
}
/*var charMapList =[];
var charList =[];
for(var i=0;i<fileString.length;i++){
    var temp =fileString.charAt(i);
    if(charList.indexOf(temp)==-1){
        charList.splice(i,0,temp)
        charMapList.splice(i,0,new charMap(temp,i));
    }
    else{
        charMapList[charList.indexOf(temp)].positionOfOccurence.push(i);
    }
    
}
for(var i=0;i<charMapList.length;i++){
    var output = charMapList[i].character + ": ["+ charMapList[i].positionOfOccurence+" ]";
    fs.appendFileSync(outputFile,output,'hex');
}*/
//fs.writeFileSync(outputFile,charMapList);
util.getFileSize(outputFile);
