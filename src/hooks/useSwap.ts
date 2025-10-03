import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, parseUnits, Address } from 'viem';
import { CONTRACT_ADDRESSES, OKIE_SWAP_ABI, ERC20_ABI } from '../config/contracts';
import { useChainId, useAccount } from 'wagmi';

export function useSwap() {
  const chainId = useChainId();
  const { address } = useAccount();
  const swapAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.OKIE_SWAP;

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const swapETHForTokens = async (
    tokenAddress: Address,
    amountIn: string,
    slippageTolerance: number = 0.5
  ) => {
    if (!swapAddress || !address) {
      throw new Error('Swap contract not available or wallet not connected');
    }

    const amountInWei = parseEther(amountIn);
    const path = [
      '0x0000000000000000000000000000000000000000', // ETH placeholder
      tokenAddress
    ];

    // Get expected output amount
    const amountsOut = await getAmountsOut(amountInWei.toString(), path);
    if (!amountsOut || amountsOut.length < 2) {
      throw new Error('Unable to calculate swap amounts');
    }

    const expectedOut = BigInt(amountsOut[1]);
    const minAmountOut = expectedOut * BigInt(Math.floor((100 - slippageTolerance) * 100)) / BigInt(10000);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200); // 20 minutes

    return writeContract({
      address: swapAddress,
      abi: OKIE_SWAP_ABI,
      functionName: 'swapExactETHForTokens',
      args: [minAmountOut, path, address, deadline],
      value: amountInWei,
    });
  };

  const swapTokensForETH = async (
    tokenAddress: Address,
    amountIn: string,
    decimals: number = 18,
    slippageTolerance: number = 0.5
  ) => {
    if (!swapAddress || !address) {
      throw new Error('Swap contract not available or wallet not connected');
    }

    const amountInWei = parseUnits(amountIn, decimals);
    const path = [
      tokenAddress,
      '0x0000000000000000000000000000000000000000' // ETH placeholder
    ];

    // Get expected output amount
    const amountsOut = await getAmountsOut(amountInWei.toString(), path);
    if (!amountsOut || amountsOut.length < 2) {
      throw new Error('Unable to calculate swap amounts');
    }

    const expectedOut = BigInt(amountsOut[1]);
    const minAmountOut = expectedOut * BigInt(Math.floor((100 - slippageTolerance) * 100)) / BigInt(10000);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200); // 20 minutes

    return writeContract({
      address: swapAddress,
      abi: OKIE_SWAP_ABI,
      functionName: 'swapExactTokensForETH',
      args: [amountInWei, minAmountOut, path, address, deadline],
    });
  };

  const getAmountsOut = async (amountIn: string, path: Address[]) => {
    if (!swapAddress) return null;

    try {
      const result = await useReadContract({
        address: swapAddress,
        abi: OKIE_SWAP_ABI,
        functionName: 'getAmountsOut',
        args: [BigInt(amountIn), path],
      });
      return result.data as bigint[];
    } catch (error) {
      console.error('Error getting amounts out:', error);
      return null;
    }
  };

  return {
    swapETHForTokens,
    swapTokensForETH,
    getAmountsOut,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useTokenBalance(tokenAddress?: Address, userAddress?: Address) {
  return useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: !!tokenAddress && !!userAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });
}

export function useTokenInfo(tokenAddress?: Address) {
  const nameQuery = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'name',
    query: { enabled: !!tokenAddress },
  });

  const symbolQuery = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: { enabled: !!tokenAddress },
  });

  const decimalsQuery = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: { enabled: !!tokenAddress },
  });

  const totalSupplyQuery = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'totalSupply',
    query: { enabled: !!tokenAddress },
  });

  return {
    name: nameQuery.data as string,
    symbol: symbolQuery.data as string,
    decimals: decimalsQuery.data as number,
    totalSupply: totalSupplyQuery.data as bigint,
    isLoading: nameQuery.isLoading || symbolQuery.isLoading || decimalsQuery.isLoading || totalSupplyQuery.isLoading,
    error: nameQuery.error || symbolQuery.error || decimalsQuery.error || totalSupplyQuery.error,
  };
}