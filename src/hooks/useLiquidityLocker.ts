import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseUnits, Address } from 'viem';
import { CONTRACT_ADDRESSES, LIQUIDITY_LOCKER_ABI } from '../config/contracts';
import { useChainId } from 'wagmi';

export function useLiquidityLocker() {
  const chainId = useChainId();
  const lockerAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.LIQUIDITY_LOCKER;

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const lockLiquidity = async (
    tokenAddress: Address,
    amount: string,
    lockDurationDays: number,
    decimals: number = 18
  ) => {
    if (!lockerAddress) {
      throw new Error('Liquidity locker not deployed on this network');
    }

    const amountWei = parseUnits(amount, decimals);
    const unlockTime = BigInt(Math.floor(Date.now() / 1000) + (lockDurationDays * 24 * 60 * 60));

    return writeContract({
      address: lockerAddress,
      abi: LIQUIDITY_LOCKER_ABI,
      functionName: 'lockLiquidity',
      args: [tokenAddress, amountWei, unlockTime],
    });
  };

  const unlockLiquidity = async (lockId: bigint) => {
    if (!lockerAddress) {
      throw new Error('Liquidity locker not deployed on this network');
    }

    return writeContract({
      address: lockerAddress,
      abi: LIQUIDITY_LOCKER_ABI,
      functionName: 'unlockLiquidity',
      args: [lockId],
    });
  };

  return {
    lockLiquidity,
    unlockLiquidity,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

export function useLockInfo(tokenAddress?: Address) {
  const chainId = useChainId();
  const lockerAddress = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]?.LIQUIDITY_LOCKER;

  return useReadContract({
    address: lockerAddress,
    abi: LIQUIDITY_LOCKER_ABI,
    functionName: 'getLockInfo',
    args: tokenAddress ? [tokenAddress] : undefined,
    query: {
      enabled: !!tokenAddress && !!lockerAddress,
    },
  });
}