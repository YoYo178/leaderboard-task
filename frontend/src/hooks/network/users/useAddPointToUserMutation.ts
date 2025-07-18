import { useMutationBase } from "../useMutationBase";
import APIEndpoints from "../../../config/APIEndpoints";

export const useAddPointToUserMutation = useMutationBase(APIEndpoints.ADD_POINT_TO_USER, "Add point to user");