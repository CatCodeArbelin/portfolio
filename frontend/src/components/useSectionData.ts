import { useCallback, useEffect, useRef, useState } from 'react';

export type SectionDataState<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; message: string };

type UseSectionDataOptions<T> = {
  loadData: () => Promise<T>;
  getFallbackError: () => string;
};

function getErrorMessage(error: unknown, getFallbackError: () => string): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return getFallbackError();
}

export function useSectionData<T>({
  loadData,
  getFallbackError,
}: UseSectionDataOptions<T>): [SectionDataState<T>, () => void] {
  const requestIdRef = useRef(0);
  const [sectionState, setSectionState] = useState<SectionDataState<T>>({ status: 'loading' });

  const loadSectionData = useCallback(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setSectionState({ status: 'loading' });

    loadData()
      .then((data) => {
        if (requestIdRef.current === requestId) {
          setSectionState({ status: 'ready', data });
        }
      })
      .catch((error: unknown) => {
        if (requestIdRef.current === requestId) {
          setSectionState({ status: 'error', message: getErrorMessage(error, getFallbackError) });
        }
      });
  }, [getFallbackError, loadData]);

  useEffect(() => {
    loadSectionData();

    return () => {
      requestIdRef.current += 1;
    };
  }, [loadSectionData]);

  return [sectionState, loadSectionData];
}
