import { useQueryBase } from '../useQueryBase';
import APIEndpoints from '../../../config/APIEndpoints';

export const useGetUserQuery = useQueryBase(APIEndpoints.GET_USER, true, false);