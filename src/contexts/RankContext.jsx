import { createContext, useContext, useReducer } from 'react';

const RankContext = createContext();

const initialState = {
  ranks: [],
  userRanks: {},
  rankRequirements: {},
  rankStats: {
    totalPromotions: 0,
    averageTimeToPromote: 0,
    topPerformers: []
  }
};

function rankReducer(state, action) {
  switch (action.type) {
    case 'SET_RANKS':
      return {
        ...state,
        ranks: action.payload
      };
    case 'UPDATE_USER_RANK':
      return {
        ...state,
        userRanks: {
          ...state.userRanks,
          [action.payload.userId]: action.payload.rank
        }
      };
    case 'UPDATE_REQUIREMENTS':
      return {
        ...state,
        rankRequirements: {
          ...state.rankRequirements,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export function RankProvider({ children }) {
  const [state, dispatch] = useReducer(rankReducer, initialState);

  const value = {
    ...state,
    setRanks: (ranks) => dispatch({ type: 'SET_RANKS', payload: ranks }),
    updateUserRank: (userId, rank) => 
      dispatch({ type: 'UPDATE_USER_RANK', payload: { userId, rank } }),
    updateRequirements: (requirements) => 
      dispatch({ type: 'UPDATE_REQUIREMENTS', payload: requirements })
  };

  return (
    <RankContext.Provider value={value}>
      {children}
    </RankContext.Provider>
  );
}

export const useRank = () => useContext(RankContext);