import { memo } from "react";

/**
 * Higher-order component that applies React.memo with custom comparison function
 * @param {React.ComponentType} Component - The component to memoize
 * @param {Function} compareProps - Optional custom props comparison function
 * @returns {React.MemoExoticComponent} Memoized component
 */
export const withMemo = (Component, compareProps = null) => {
  // If no custom comparison function is provided, use React.memo as is
  if (!compareProps) {
    return memo(Component);
  }

  // Otherwise, use React.memo with the custom comparison function
  return memo(Component, compareProps);
};

/**
 * Predefined comparison function to ignore specific props when comparing
 * @param {Array} ignoredProps - Array of prop names to ignore in comparison
 * @returns {Function} Comparison function for React.memo
 */
export const ignoreProps = (ignoredProps = []) => {
  return (prevProps, nextProps) => {
    // Create new objects without the ignored props
    const filteredPrevProps = { ...prevProps };
    const filteredNextProps = { ...nextProps };

    // Remove ignored props from comparison
    ignoredProps.forEach((propName) => {
      delete filteredPrevProps[propName];
      delete filteredNextProps[propName];
    });

    // Deep compare the remaining props
    return (
      JSON.stringify(filteredPrevProps) === JSON.stringify(filteredNextProps)
    );
  };
};

/**
 * Predefined comparison function to only compare specific props
 * @param {Array} propsToCompare - Array of prop names to include in comparison
 * @returns {Function} Comparison function for React.memo
 */
export const onlyCompareProps = (propsToCompare = []) => {
  return (prevProps, nextProps) => {
    // Compare only the specified props
    return propsToCompare.every((propName) => {
      return prevProps[propName] === nextProps[propName];
    });
  };
};

export default withMemo;
