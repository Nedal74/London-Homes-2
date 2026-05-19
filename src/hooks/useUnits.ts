import { useState, useEffect, useCallback } from 'react';
import type { Unit } from '../types';
import { fetchUnitsFromSheet } from '../services/sheetsService';

interface UseUnitsReturn {
  units: Unit[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUnits(): UseUnitsReturn {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUnitsFromSheet();
      setUnits(data);
    } catch {
      setError('Failed to load units');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { units, loading, error, refetch: fetchData };
}
