import { useCallback, useEffect, useRef, useState } from 'react';

import { getPortfolioApiErrorDetails } from '../api/portfolio';

export type SectionDataState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T; source: 'api' | 'fallback' }
  | { status: 'empty'; message: string };

type UseSectionDataOptions<T> = {
  loadData: () => Promise<T>;
  fallbackData?: T;
  emptyMessage: string;
  logContext: string;
};

function getInitialSectionState<T>(fallbackData: T | undefined): SectionDataState<T> {
  if (fallbackData !== undefined) {
    return { status: 'ready', data: fallbackData, source: 'fallback' };
  }

  return { status: 'loading' };
}

export function useSectionData<T>({
  loadData,
  fallbackData,
  emptyMessage,
  logContext,
}: UseSectionDataOptions<T>): [SectionDataState<T>, () => void] {
  const requestIdRef = useRef(0);
  const hasFallback = fallbackData !== undefined;
  const [sectionState, setSectionState] = useState<SectionDataState<T>>(
    getInitialSectionState(fallbackData),
  );

  const loadSectionData = useCallback(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    if (!hasFallback) {
      setSectionState({ status: 'loading' });
    }

    loadData()
      .then((data) => {
        if (requestIdRef.current === requestId) {
          setSectionState({ status: 'ready', data, source: 'api' });
        }
      })
      .catch((error: unknown) => {
        console.warn(
          `${logContext}: portfolio API недоступен, показываем fallback или empty-state.`,
          getPortfolioApiErrorDetails(error),
        );

        if (requestIdRef.current === requestId) {
          if (hasFallback) {
            setSectionState({ status: 'ready', data: fallbackData, source: 'fallback' });
            return;
          }

          setSectionState({ status: 'empty', message: emptyMessage });
        }
      });
  }, [emptyMessage, fallbackData, hasFallback, loadData, logContext]);

  useEffect(() => {
    loadSectionData();

    return () => {
      requestIdRef.current += 1;
    };
  }, [loadSectionData]);

  return [sectionState, loadSectionData];
}
