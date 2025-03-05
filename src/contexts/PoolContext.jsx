import { createContext, useContext, useReducer } from 'react';

const PoolContext = createContext();

const initialState = {
  pools: [],
  activePool: null,
  spilloverRules: {},
  poolStats: {
    totalVolume: 0,
    activeParticipants: 0,
    totalRewards: 0
  }
};

function poolReducer(state, action) {
  switch (action.type) {
    case 'ADD_POOL':
      return {
        ...state,
        pools: [...state.pools, action.payload]
      };
    case 'UPDATE_POOL':
      return {
        ...state,
        pools: state.pools.map(pool => 
          pool.id === action.payload.id ? action.payload : pool
        )
      };
    case 'SET_ACTIVE_POOL':
      return {
        ...state,
        activePool: action.payload
      };
    case 'UPDATE_SPILLOVER_RULES':
      return {
        ...state,
        spilloverRules: {
          ...state.spilloverRules,
          ...action.payload
        }
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        poolStats: {
          ...state.poolStats,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export function PoolProvider({ children }) {
  const [state, dispatch] = useReducer(poolReducer, initialState);

  const value = {
    ...state,
    addPool: (pool) => dispatch({ type: 'ADD_POOL', payload: pool }),
    updatePool: (pool) => dispatch({ type: 'UPDATE_POOL', payload: pool }),
    setActivePool: (poolId) => dispatch({ type: 'SET_ACTIVE_POOL', payload: poolId }),
    updateSpilloverRules: (rules) => dispatch({ type: 'UPDATE_SPILLOVER_RULES', payload: rules }),
    updateStats: (stats) => dispatch({ type: 'UPDATE_STATS', payload: stats })
  };

  return (
    <PoolContext.Provider value={value}>
      {children}
    </PoolContext.Provider>
  );
}

export const usePool = () => useContext(PoolContext);