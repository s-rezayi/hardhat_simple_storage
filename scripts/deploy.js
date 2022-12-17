const { ethers, run, network } = require("hardhat")
require("dotenv").config()

const main = async () => {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying ...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(simpleStorage.address)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Block Confirmations ...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // Update the current value
    // const txResponseStore = await simpleStorage.store(7)
    // await txResponseStore.wait(1)
    // const updatedValue = await simpleStorage.retrieve()
    // console.log(`Updated value is: ${updatedValue}`)

    // Add Person
    const txResponseAddPerson = await simpleStorage.addPerson("Soheil", 7)
    await txResponseAddPerson.wait(1)
    const addedPerson = await simpleStorage.people("0")
    console.log(`Added person is: ${addedPerson}`)
}

const verify = async (contractAddress, args) => {
    console.log("verifying ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()
