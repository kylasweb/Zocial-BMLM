import { lazy, Suspense } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';

export function lazyLoadComponent(importFunc) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}