const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying OkieLaunch contracts to X Layer...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy LiquidityLocker first
  console.log("\n1. Deploying LiquidityLocker...");
  const LiquidityLocker = await ethers.getContractFactory("LiquidityLocker");
  const liquidityLocker = await LiquidityLocker.deploy();
  await liquidityLocker.deployed();
  console.log("LiquidityLocker deployed to:", liquidityLocker.address);

  // Deploy TokenFactory
  console.log("\n2. Deploying TokenFactory...");
  const TokenFactory = await ethers.getContractFactory("TokenFactory");
  const tokenFactory = await TokenFactory.deploy(liquidityLocker.address);
  await tokenFactory.deployed();
  console.log("TokenFactory deployed to:", tokenFactory.address);

  // Deploy OKIE token (platform token)
  console.log("\n3. Deploying OKIE platform token...");
  const OkieToken = await ethers.getContractFactory("OkieToken");
  const okieToken = await OkieToken.deploy(
    "Okie Finance",
    "OKIE",
    ethers.utils.parseEther("100000000"), // 100M tokens
    deployer.address,
    true, // has team vesting
    30 * 24 * 60 * 60 // 30 days cliff
  );
  await okieToken.deployed();
  console.log("OKIE token deployed to:", okieToken.address);

  // Enable trading for OKIE token
  console.log("\n4. Enabling trading for OKIE token...");
  await okieToken.enableTrading();
  console.log("Trading enabled for OKIE token");

  // Verify contracts on explorer (if verification is available)
  console.log("\n5. Contract deployment summary:");
  console.log("================================");
  console.log("LiquidityLocker:", liquidityLocker.address);
  console.log("TokenFactory:", tokenFactory.address);
  console.log("OKIE Token:", okieToken.address);
  console.log("Deployer:", deployer.address);
  
  // Save deployment addresses to a file
  const deploymentInfo = {
    network: "xlayer",
    chainId: 196, // X Layer mainnet
    contracts: {
      LiquidityLocker: liquidityLocker.address,
      TokenFactory: tokenFactory.address,
      OkieToken: okieToken.address,
    },
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
  };

  const fs = require("fs");
  fs.writeFileSync(
    "deployment-xlayer.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("\nDeployment info saved to deployment-xlayer.json");
  console.log("Deployment completed successfully! 🚀");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });