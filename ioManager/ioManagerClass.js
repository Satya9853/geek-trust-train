require("dotenv").config()
const fsPromises = require("fs/promises")

class ioManagerCLass{
    async #readFileAsync(source_to_file){
        try{
            const data = await fsPromises.readFile(source_to_file, "utf-8");
            return data;
        }catch(error){
            console.log(error);
        }
    }

    async readCommandLine(){
        const filename = process.argv[2]
        let data = await fsPromises.readFile(filename, "utf8");
        data = data.toString().split("\n").map((input) =>input.replace(/(\r\n|\n|\r)/gm, ""));
        return data;
    }

    async getDataTrainA(){
        let data = await this.#readFileAsync(process.env.train_A_DATA);
        data = await JSON.parse(data);
        return data;
    }

    async getDataTrainB(){
        let data = await this.#readFileAsync(process.env.train_B_DATA);
        data = await JSON.parse(data);
        return data;
    }

    getStationArray(singleinputString){
        const stationArray = singleinputString.split(" ");
        return stationArray;
    }

    finalOutput(trainObject){
        Object.keys(trainObject).forEach(train =>{
            const temp = trainObject[train].map(station => station[0]).join(" ");
            if(train === "TRAIN_A" || train === "TRAIN_B"){
                console.log(`ARRIVAL ${train} ENGINE ${temp}`);
            }
            else console.log(`DEPARTURE ${train} ENGINE ENGINE ${temp}`);
        })
    }

    journeyEnded(){
        console.log("JOURNEY_ENDED");
    }

}

module.exports=ioManagerCLass;