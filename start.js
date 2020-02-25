let profileInfo=require('./index.js');
let File=require('./file.js');

function JsToJson(){
    try {
        let pageList=Object.keys(profileInfo);
        for (let i in pageList) {
            let pageItem=profileInfo[pageList[i]];
            if (pageItem.functionList) {
                let functionList=Object.keys(pageItem.functionList);
                for (let j = 0; j < functionList.length; j++) {
                    let key=functionList[j];
                    profileInfo[pageList[i]].functionList[key]=profileInfo[pageList[i]].functionList[key].toString().replace(/[\r\n]/g,"")
                }
            }
        }
        File.newFile("./index.json",JSON.stringify(profileInfo))
    } catch (e) {
        console.log(e);
    }
}
JsToJson();
