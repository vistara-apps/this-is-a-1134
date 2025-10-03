import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, parseUnits, Address } from 'viem';
import { CONTRACT_ADDRESSES, TOKEN_FACTORY_ABI } from '../config/contracts';
import { useChainId } from 'wagmi';
import { LaunchData } from '../components/LaunchWizard';

export function useTokenFactory() {
  const chainId = useChainId();
  const factoryAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.TOKEN_FACTORY;

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createToken = async (launchData: LaunchData) => {
    if (!factoryAddress) {
      throw new Error('Token factory not deployed on this network');
    }

    const totalSupply = parseUnits(launchData.supply, 18);
    const initialPrice = parseEther(launchData.initialPrice);
    const liquidityAmount = parseEther(launchData.liquidityAmount);
    const lockDuration = BigInt(launchData.lockDuration * 24 * 60 * 60); // Convert days to seconds
    const vestingCliff = BigInt(launchData.vestingCliff * 24 * 60 * 60); // Convert days to seconds

    return writeContract({
      address: factoryAddress,
      abi: TOKEN_FACTORY_ABI,
      functionName: 'createToken',
      args: [
        launchData.name,
        launchData.symbol,
        totalSupply,
        initialPrice,
        liquidityAmount,
        lockDuration,
        launchData.teamVesting,
        vestingCliff,
      ],
      value: liquidityAmount, // Send ETH for initial liquidity
    });
  };

  return {
    createToken,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useTokensByCreator(creator?: Address) {
  const chainId = useChainId();
  const factoryAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.TOKEN_FACTORY;

  return useReadContract({
    address: factoryAddress,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getTokensByCreator',
    args: creator ? [creator] : undefined,
    query: {
      enabled: !!creator && !!factoryAddress,
    },
  });
}

export function useAllTokens() {
  const chainId = useChainId();
  const factoryAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.TOKEN_FACTORY;

  return useReadContract({
    address: factoryAddress,
    abi: TOKEN_FACTORY_ABI,
    functionName: 'getAllTokens',
    query: {
      enabled: !!factoryAddress,
    },
  });
}