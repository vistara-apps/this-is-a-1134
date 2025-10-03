import React, { useState, useEffect } from 'react';
import { ExternalLink, TrendingUp, TrendingDown, MoreHorizontal, Search } from 'lucide-react';
import { BlockchainService, TokenData } from '../services/blockchain';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface AllTokensTableProps {
  maxHeight?: string;
}

export function AllTokensTable({ maxHeight = "600px" }: AllTokensTableProps) {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState<'volume' | 'marketCap' | 'createdAt' | 'tradeCount'>('volume');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const blockchainService = BlockchainService.getInstance();
  const pageSize = 20;

  const fetchTokens = async (resetPage = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentPage = resetPage ? 1 : page;
      if (resetPage) setPage(1);
      
      const response = await blockchainService.getAllTokens({
        page: currentPage,
        pageSize,
        sort: sortBy,
        order: sortOrder,
        search: search.trim() || undefined
      });
      
      setTokens(response.tokens);
      setTotal(response.total);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError('Failed to load tokens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens(true);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search !== '') {
        fetchTokens(true);
      } else {
        fetchTokens(true);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  useEffect(() => {
    fetchTokens();
  }, [page]);

  const handleSort = (newSortBy: typeof sortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toExponential(4);
    if (price < 0.001) return price.toFixed(8);
    if (price < 1) return price.toFixed(6);
    return price.toFixed(4);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = (isVerified: boolean, liquidityLocked: boolean) => {
    if (isVerified && liquidityLocked) return 'text-success bg-success/20';
    if (liquidityLocked) return 'text-warning bg-warning/20';
    return 'text-text-muted bg-surface-hover';
  };

  const getStatusText = (isVerified: boolean, liquidityLocked: boolean) => {
    if (isVerified && liquidityLocked) return 'Live';
    if (liquidityLocked) return 'Active';
    return 'Pending';
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getSortIcon = (column: typeof sortBy) => {
    if (sortBy !== column) return null;
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
      {/* Header with Search */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold">All X Layer Tokens</h3>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search tokens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="w-64"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchTokens(true)}
              loading={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-4 text-sm text-text-muted">
          Showing {tokens.length} of {total} tokens {search && `matching "${search}"`}
        </div>
      </div>

      {/* Table */}
      <div style={{ maxHeight }} className="overflow-auto">
        {loading && page === 1 ? (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-text-muted">Loading tokens...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-danger mb-4">{error}</p>
            <Button onClick={() => fetchTokens(true)} variant="primary" size="sm">
              Retry
            </Button>
          </div>
        ) : tokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">
              {search ? `No tokens found matching "${search}"` : 'No tokens found'}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-hover sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Token
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Price
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text"
                  onClick={() => handleSort('volume')}
                >
                  24h Volume {getSortIcon('volume')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text"
                  onClick={() => handleSort('marketCap')}
                >
                  Market Cap {getSortIcon('marketCap')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Holders
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text"
                  onClick={() => handleSort('tradeCount')}
                >
                  Trades {getSortIcon('tradeCount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Health
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tokens.map((token, index) => {
                const change24h = Math.random() * 100 - 50; // TODO: Get real price change data
                return (
                  <tr key={token.address} className="hover:bg-surface-hover transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm font-bold">{token.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{token.name}</div>
                          <div className="text-sm text-text-muted">${token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(token.isVerified, token.liquidityLocked)}`}>
                        {getStatusText(token.isVerified, token.liquidityLocked)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${formatPrice(token.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${formatNumber(token.volume24h)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${formatNumber(token.marketCap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatNumber(token.holders)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatNumber(Math.floor(Math.random() * 10000))} {/* TODO: Get real trade count */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getHealthScoreColor(token.healthScore)}`}>
                        {token.healthScore}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-text-muted hover:text-text"
                          onClick={() => window.open(`https://www.okx.com/web3/explorer/xlayer/address/${token.address}`, '_blank')}
                          title="View on Explorer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-text-muted hover:text-text"
                          onClick={() => navigator.clipboard.writeText(token.address)}
                          title="Copy Address"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-text-muted">
            Page {page} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}