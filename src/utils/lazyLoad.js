import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

export function lazyLoadComponent(importFunc, fallback = <LoadingSpinner />) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
