const ioManagerCLass = require("./ioManager/ioManagerClass");
const helperFunctionsClass = require("./helperFunction/helperFunctionClass")


const main = async()=>{
    const ioManager = new ioManagerCLass();
    const helperFunction = new helperFunctionsClass();
    const inputLines = await ioManager.readCommandLine();
    let trainObject = {};
    inputLines.forEach((input)=>{
        const stationArray = ioManager.getStationArray(input);
        helperFunction.createTrainObject(trainObject ,stationArray);
    })
    trainObject = await helperFunction.getTheFormattedTrainObject(trainObject);
    ioManager.finalOutput(trainObject);
}
main();