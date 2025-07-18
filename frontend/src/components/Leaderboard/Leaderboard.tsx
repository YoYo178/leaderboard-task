import { type FC } from 'react';
import './Leaderboard.css'
import type { User } from '../../types/user.types';
import { LeaderboardEntry } from '../LeaderboardEntry/LeaderboardEntry';

interface LeaderboardEntryWithPosition {
  user: User;
  position: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntryWithPosition[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const Leaderboard: FC<LeaderboardProps> = ({ entries, selectedUser, onSelectUser }) => {
  return (
    <div className="leaderboard-container">
      {entries.length !== 0 ? (
        entries.map((entry) => (
          <LeaderboardEntry
            key={entry.user._id || entry.user.name}
            user={entry.user}
            position={entry.position}
            isSelected={selectedUser?._id === entry.user._id}
            onUserSelect={onSelectUser}
          />
        ))
      ) : (
        <h1>No users!</h1>
      )}
    </div>
  );
}
