import React, { useState } from 'react';
import { Upload, Sparkles, Hash, FileText, Coins } from 'lucide-react';
import { LaunchData } from '../LaunchWizard';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface TokenBasicsStepProps {
  data: LaunchData;
  updateData: (updates: Partial<LaunchData>) => void;
}

export function TokenBasicsStep({ data, updateData }: TokenBasicsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const trendingNames = ['PepeAI', 'MoonCoin', 'SafeDoge', 'RocketCat', 'DiamondHands'];
  
  const suggestName = () => {
    const randomName = trendingNames[Math.floor(Math.random() * trendingNames.length)];
    updateData({ name: randomName, symbol: randomName.toUpperCase().slice(0, 6) });
    // Clear errors when auto-generating
    setErrors({});
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Token name is required';
        } else if (value.length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (value.length > 50) {
          newErrors.name = 'Name must be less than 50 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'symbol':
        if (!value.trim()) {
          newErrors.symbol = 'Symbol is required';
        } else if (value.length < 2) {
          newErrors.symbol = 'Symbol must be at least 2 characters';
        } else if (value.length > 10) {
          newErrors.symbol = 'Symbol must be less than 10 characters';
        } else if (!/^[A-Z0-9]+$/.test(value)) {
          newErrors.symbol = 'Symbol must contain only uppercase letters and numbers';
        } else {
          delete newErrors.symbol;
        }
        break;
      case 'supply':
        const supply = parseFloat(value);
        if (!value.trim()) {
          newErrors.supply = 'Supply is required';
        } else if (isNaN(supply) || supply <= 0) {
          newErrors.supply = 'Supply must be a positive number';
        } else if (supply > 1e18) {
          newErrors.supply = 'Supply is too large';
        } else {
          delete newErrors.supply;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tell us about your token</h3>
        <p className="text-text-muted">
          Basic information that will be displayed to your community and potential investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <Input
            label="Token Name"
            value={data.name}
            onChange={(e) => {
              const value = e.target.value;
              updateData({ name: value });
              validateField('name', value);
            }}
            placeholder="e.g. Awesome Token"
            leftIcon={<FileText className="h-5 w-5" />}
            error={errors.name}
            helperText="Choose a memorable name for your token"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={suggestName}
            className="absolute top-8 right-2"
            icon={<Sparkles className="h-4 w-4" />}
            title="Generate random name"
          />
        </div>

        <Input
          label="Symbol"
          value={data.symbol}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            updateData({ symbol: value });
            validateField('symbol', value);
          }}
          placeholder="e.g. AWESOME"
          leftIcon={<Hash className="h-5 w-5" />}
          error={errors.symbol}
          helperText="3-10 characters, uppercase letters and numbers only"
        />
      </div>

      <Input
        label="Total Supply"
        type="number"
        value={data.supply}
        onChange={(e) => {
          const value = e.target.value;
          updateData({ supply: value });
          validateField('supply', value);
        }}
        placeholder="1000000"
        leftIcon={<Coins className="h-5 w-5" />}
        error={errors.supply}
        helperText="Total number of tokens that will ever exist"
      />

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="What makes your token special? Tell your community about your vision..."
          rows={4}
          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
        />
        <p className="text-text-muted text-xs mt-1">
          Optional: Describe your token's purpose and vision
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Logo (Optional)</label>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <Upload className="h-8 w-8 text-text-muted mx-auto mb-2" />
          <p className="text-text-muted">
            Drop your logo here or click to browse
          </p>
          <p className="text-xs text-text-muted mt-1">
            PNG, JPG up to 5MB. Recommended: 256x256px
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => updateData({ logo: e.target.files?.[0] })}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}