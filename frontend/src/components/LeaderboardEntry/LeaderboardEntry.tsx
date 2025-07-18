import type { FC } from 'react';
import './LeaderboardEntry.css'
import { IoPersonCircleSharp } from 'react-icons/io5';
import type { User } from '../../types/user.types';

interface LeaderboardEntryProps {
  user: User
  position: number;
  onUserSelect: (user: User) => void;
  isSelected?: boolean;
}

export const LeaderboardEntry: FC<LeaderboardEntryProps> = ({ user, position, onUserSelect, isSelected }) => {
  return (
    <div className={`leaderboard-entry${isSelected ? ' selected' : ''}`} onClick={() => onUserSelect(user)}>
      <div className="leaderboard-entry-details">
        <p>#{position}</p>
        <div className="leaderboard-entry-user">
          <div className={`profile-photo`}>
            <IoPersonCircleSharp />
          </div>
          <div className={`name`}>{user.name}</div>
        </div>
      </div>
      <div className={`points`}>{user.points}</div>
    </div>
  );
}
