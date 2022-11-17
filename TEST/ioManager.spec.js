const chai = require("chai");
const ioManagerCLass = require("../ioManager/ioManagerClass");
const expect = chai.expect;

const ioManager = new ioManagerCLass();

describe("This test cases are to check ioManager", function(){
    describe("This test is to check get station array method", function(){
        it("should return an array", function(){
            const string = 'TRAIN_A ENGINE NDL NDL KRN GHY SLM NJP NGP BLR';
            const data = ioManager.getStationArray(string);
            expect(data).to.be.an("array");
        })
    })

    describe("This is to check getTrainData of A method", function(){
        it("Should return on object of train information", async function(){
            const data = await ioManager.getDataTrainA();
            expect(data).to.be.an("object");
        })
    })

    describe("This is to check getTrainData of B method", function(){
        it("Should return on object of train information", async function(){
            const data = await ioManager.getDataTrainB();
            expect(data).to.be.an("object");
        })
    })
})