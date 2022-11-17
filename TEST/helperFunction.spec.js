const chai = require("chai");
const helperFunctionsClass = require("../helperFunction/helperFunctionClass");
const expect = chai.expect;

describe('This test is for Helper function class', function(){
    const helperFunction = new helperFunctionsClass();
    describe("This is to test the createTrainObject method", function(){
        it("Should return an object of the train and its station", function(){
            const trainObject = {};
            const stationArray = ['TRAIN_B', 'ENGINE','NJP','GHY','AGA','PNE','MAO','BPL','PTA'];
            helperFunction.createTrainObject(trainObject ,stationArray);
            expect(trainObject).to.be.an("object");
            expect(trainObject).to.have.own.property('TRAIN_B');
        })
    })

    describe("This is to test Final Tree Object", function(){
        it("should return an object an array of string and number", async function(){
            let treeObject = {
                TRAIN_A: [
                  'NDL', 'NDL',
                  'KRN', 'GHY',
                  'SLM', 'NJP',
                  'NGP', 'BLR'
                ],
                TRAIN_B: [
                  'NJP', 'GHY',
                  'AGA', 'PNE',
                  'MAO', 'BPL',
                  'PTA'
                ]
              }
              treeObject = await helperFunction.getTheFormattedTrainObject(treeObject);
            expect(treeObject).to.have.all.keys("TRAIN_A", "TRAIN_B", "TRAIN_AB");
        })
    })

})