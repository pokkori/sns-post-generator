'use client';
import { useState, useEffect } from 'react';

export function useFreemiumLimit(key: string, maxFreeCount: number) {
  const [usageCount, setUsageCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(key);
    setUsageCount(stored ? parseInt(stored, 10) : 0);
  }, [key]);

  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    if (mounted) {
      localStorage.setItem(key, String(newCount));
    }
  };

  const isLimitReached = mounted && usageCount >= maxFreeCount;
  const remainingCount = mounted ? Math.max(0, maxFreeCount - usageCount) : maxFreeCount;

  return { usageCount, isLimitReached, remainingCount, incrementUsage, mounted };
}
