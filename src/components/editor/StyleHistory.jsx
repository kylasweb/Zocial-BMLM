import { useState, useEffect } from 'react';
import { FiRotateCcw, FiRotateCw, FiSave } from 'react-icons/fi';

export default function StyleHistory() {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [snapshots, setSnapshots] = useState([]);

  useEffect(() => {
    // Listen for style changes and update history
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          addToHistory({
            element: mutation.target,
            oldStyle: mutation.oldValue,
            newStyle: mutation.target.style.cssText
          });
        }
      });
    });

    observer.observe(document.querySelector('#page-content'), {
      attributes: true,
      attributeOldValue: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  const addToHistory = (change) => {
    setHistory(prev => [...prev.slice(0, currentIndex + 1), change]);
    setCurrentIndex(prev => prev + 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      const change = history[currentIndex];
      change.element.style.cssText = change.oldStyle;
      setCurrentIndex(prev => prev - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      const change = history[currentIndex + 1];
      change.element.style.cssText = change.newStyle;
      setCurrentIndex(prev => prev + 1);
    }
  };

  const saveSnapshot = () => {
    const snapshot = {
      styles: getComputedStyles(),
      timestamp: new Date().toISOString()
    };
    setSnapshots(prev => [...prev, snapshot]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Style History</h3>
        <div className="flex space-x-2">
          <button
            onClick={undo}
            disabled={currentIndex <= 0}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FiRotateCcw size={16} />
          </button>
          <button
            onClick={redo}
            disabled={currentIndex >= history.length - 1}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FiRotateCw size={16} />
          </button>
          <button
            onClick={saveSnapshot}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FiSave size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {snapshots.map((snapshot, index) => (
          <div
            key={snapshot.timestamp}
            className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
          >
            <span className="text-sm">
              Snapshot {index + 1} - {new Date(snapshot.timestamp).toLocaleTimeString()}
            </span>
            <button
              onClick={() => applySnapshot(snapshot)}
              className="text-sm text-primary-600"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}