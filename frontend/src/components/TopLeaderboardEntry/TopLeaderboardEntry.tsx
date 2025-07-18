import type { FC } from 'react';
import './TopLeaderboardEntry.css'
import { IoPersonCircleSharp } from 'react-icons/io5';

interface TopLeaderboardEntryProps {
    name: string;
    points: number;
    position: 1 | 2 | 3;
    isSelected?: boolean;
    onUserSelect?: () => void;
}

export const TopLeaderboardEntry: FC<TopLeaderboardEntryProps> = ({ name, points, position, isSelected, onUserSelect }) => {
    return (
        <div className={`top-leaderboard-entry${isSelected ? ' selected' : ''}`} onClick={onUserSelect}>
            <div className={`top-${position}-medal`}>{position}</div>
            <div className={`top-profile-photo`}>
                <IoPersonCircleSharp />
            </div>
            <div className={`top-name`}>{name}</div>
            <div className={`top-points`}>{points}</div>
        </div>
    )
}
