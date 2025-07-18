import { useQueryBase } from '../useQueryBase';
import APIEndpoints from '../../../config/APIEndpoints';

export const useGetAllUsersQuery = useQueryBase(APIEndpoints.GET_ALL_USERS, false, false);