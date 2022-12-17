const { ethers } = require("hardhat")
const { assert, should } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a faviorite number equal to 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update value when we call store", async function () {
        const expectedValue = "7"
        const TxResponce = await simpleStorage.store(expectedValue)
        await TxResponce.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

    // it("Should add people to the array when we call addPerson", async function () {
    //     const exectedFavoriteNumber = 7
    //     const expectedName = "Soheil"
    //     const expectedArray = [exectedFavoriteNumber, expectedName]
    //     const TxResponce = await simpleStorage.addPerson("Soheil", 7)
    //     await TxResponce.wait(1)

    //     let peopleArray = await simpleStorage.people("0")
    //     await peopleArray[0].toString()

    //     // assert.equal(name, expectedName)
    //     assert.deepEqual(peopleArray, expectedArray)
    // })
})
