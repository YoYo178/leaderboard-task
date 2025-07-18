import { useEffect, type FC } from 'react';
import type { User } from '../../types/user.types';
import { TopLeaderboardEntry } from '../TopLeaderboardEntry/TopLeaderboardEntry';
import './TopLeaderboard.css'

interface TopLeaderboardProps {
  rankedUsers: {
    position: 1 | 2 | 3;
    user: User
  }[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const TopLeaderboard: FC<TopLeaderboardProps> = ({ rankedUsers, selectedUser, onSelectUser }) => {
  return (
    <div className="top-leaderboard-container">
      {rankedUsers.map(userObj => (
        <TopLeaderboardEntry
          key={userObj.user._id || userObj.user.name}
          name={userObj.user.name}
          points={userObj.user.points}
          position={userObj.position as 1 | 2 | 3}
          isSelected={selectedUser?._id === userObj.user._id}
          onUserSelect={() => onSelectUser(userObj.user)}
        />
      ))}
    </div>
  );
}
