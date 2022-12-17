const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    async (tskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
