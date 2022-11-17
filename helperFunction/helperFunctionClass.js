const ioManagerCLass = require("../ioManager/ioManagerClass");
require("dotenv").config();

class helperFunctionsClass extends ioManagerCLass{

    createTrainObject(object, trainArray){
        object[trainArray[0]] = trainArray.slice(2, trainArray.length);
    }

    async #createStationDistancePair(stationArray){
        const trainDataA = await this.getDataTrainA();
        const trainDataB = await this.getDataTrainB();
        for(let i=0; i<stationArray.length; i++){
            if(trainDataA[stationArray[i]])
                stationArray[i] = [stationArray[i],trainDataA[stationArray[i]]];
            else
                stationArray[i] = [stationArray[i],trainDataB[stationArray[i]]];;

        }
        return stationArray
    }

    #removeStation(trainObject){
        const limitA = process.env.limitA;
        const limitB = process.env.limitB;
        trainObject.TRAIN_A = trainObject.TRAIN_A.filter(station => station[1] >= limitA);
        trainObject.TRAIN_B = trainObject.TRAIN_B.filter(station => station[1] >= limitB);
        return trainObject;


    }

    #mergeTrain(trainObject){
        trainObject.TRAIN_AB = trainObject.TRAIN_A.concat(trainObject.TRAIN_B);
        trainObject.TRAIN_AB = trainObject.TRAIN_AB.filter(station => station[0] !== "HYB");
        return trainObject.TRAIN_AB;
    }

    #sortMergedArray(stationArray){
        return stationArray.sort((a, b) => b[1]-a[1]);
    }

   async getTheFormattedTrainObject(trainObject){
    trainObject.TRAIN_A = await this.#createStationDistancePair(trainObject.TRAIN_A);
    trainObject.TRAIN_B = await this.#createStationDistancePair(trainObject.TRAIN_B);

    trainObject = this.#removeStation(trainObject);
    trainObject.TRAIN_AB = this.#mergeTrain(trainObject);
    if(trainObject.TRAIN_AB.length == 0) {
        this.journeyEnded();
        return;
    }
    trainObject.TRAIN_AB = this.#sortMergedArray(trainObject.TRAIN_AB);

    return trainObject;
    }
}


module.exports=helperFunctionsClass;