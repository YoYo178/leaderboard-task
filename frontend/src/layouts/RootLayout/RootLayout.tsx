import { useState, useEffect } from 'react';
import { Leaderboard } from '../../components/Leaderboard/Leaderboard'
import { TopLeaderboard } from '../../components/TopLeaderboard/TopLeaderboard'
import { useUsersContext } from '../../contexts/UsersContext';
import type { User } from '../../types/user.types';
import './RootLayout.css'
import { useAddPointToUserMutation } from '../../hooks/network/users/useAddPointToUserMutation';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUserMutation } from '../../hooks/network/users/useCreateUserMutation';

const ENTRIES_PER_PAGE = 4;

export const RootLayout = () => {
    const queryClient = useQueryClient();

    const { users } = useUsersContext();
    const [sortedUsers, setSortedUsers] = useState<User[]>([]);
    const [rankedUsers, setRankedUsers] = useState<{ position: 1 | 2 | 3, user: User }[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showNoUserMsg, setShowNoUserMsg] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [addUserError, setAddUserError] = useState('');

    const addPointToUserMutation = useAddPointToUserMutation({ queryKey: ['user'] });
    const createUserMutation = useCreateUserMutation({ queryKey: ['users'] });

    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!users.length)
            return;

        const sorted = users.sort((a, b) => b.points - a.points);
        setSortedUsers(sorted);
        const paginated = sorted.slice(users.length > 3 ? 3 : 0);
        setTotalPages(Math.ceil(paginated.length / ENTRIES_PER_PAGE) || 1);
        setPageNumber(1);
    }, [users]);

    useEffect(() => {
        if (!sortedUsers.length)
            return;

        setRankedUsers([
            { position: 2, user: sortedUsers[1] },
            { position: 1, user: sortedUsers[0] },
            { position: 3, user: sortedUsers[2] },
        ])
    }, [sortedUsers]);

    const getCurrentPageEntries = () => {
        const paginated = sortedUsers.slice(users.length > 3 ? 3 : 0);
        const startIdx = (pageNumber - 1) * ENTRIES_PER_PAGE;
        return paginated.slice(startIdx, startIdx + ENTRIES_PER_PAGE).map((user, idx) => ({
            user,
            position: startIdx + idx + (users.length > 3 ? 4 : 1),
        }));
    };

    const handlePrev = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setPageNumber((prev) => Math.min(prev + 1, totalPages));
    };

    const handleClaimPoints = () => {
        if (!selectedUser) {
            setShowNoUserMsg(true);
            setTimeout(() => setShowNoUserMsg(false), 2000);
            return;
        }
        addPointToUserMutation.mutate({
            pathParams: {
                userID: selectedUser._id!
            }
        })
    };

    const handleAddUser = () => {
        setShowAddUserModal(true);
        setNewUserName('');
        setAddUserError('');
    };

    const handleAddUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUserName.trim()) {
            setAddUserError('Name is required');
            return;
        }
        createUserMutation.mutate({ payload: { name: newUserName.trim() } }, {
            onSuccess: () => {
                setShowAddUserModal(false);
                setNewUserName('');
                setAddUserError('');
                queryClient.invalidateQueries({ queryKey: ['users'] });
            },
            onError: (err: any) => {
                setAddUserError(err?.response?.data?.message || 'Failed to add user');
            }
        });
    };

    const handleAddUserCancel = () => {
        setShowAddUserModal(false);
        setNewUserName('');
        setAddUserError('');
    };

    useEffect(() => {
        if (addPointToUserMutation.data) {
            alert(`Claimed ${addPointToUserMutation.data.data.pointsAdded} points for ${selectedUser?.name}`);
        }
        queryClient.invalidateQueries({ queryKey: ['users'] })
    }, [addPointToUserMutation.isSuccess])

    return (
        <div className='root-container'>
            <div className='main-container'>
                <div className="buttons-flex">
                    <button className='claim-points-btn' onClick={handleClaimPoints} disabled={!selectedUser}>Claim points</button>
                    <button className='add-user-btn' onClick={handleAddUser}>Add User</button>
                </div>

                {users.length > 3 ? (
                    <TopLeaderboard
                        rankedUsers={rankedUsers}
                        selectedUser={selectedUser}
                        onSelectUser={setSelectedUser}
                    />
                ) : null}

                <Leaderboard
                    entries={getCurrentPageEntries()}
                    selectedUser={selectedUser}
                    onSelectUser={setSelectedUser}
                />

                {users.length > (3 + ENTRIES_PER_PAGE) ? (
                    <div className="pagination-controls-wrapper">
                        <button onClick={handlePrev} disabled={pageNumber === 1}>Previous</button>
                        <span>Page {pageNumber} of {totalPages}</span>
                        <button onClick={handleNext} disabled={pageNumber === totalPages}>Next</button>
                    </div>
                ) : (
                    null
                )}

                {showNoUserMsg && (
                    <div style={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
                        Please select a user first.
                    </div>
                )}
                {showAddUserModal && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <h2>Add User</h2>
                            <form onSubmit={handleAddUserSubmit}>
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={e => setNewUserName(e.target.value)}
                                    placeholder="Enter user name"
                                    autoFocus
                                />
                                {addUserError && <div className="modal-error">{addUserError}</div>}
                                <div className="modal-actions">
                                    <button type="submit" disabled={createUserMutation.isPending}>Add</button>
                                    <button type="button" onClick={handleAddUserCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
