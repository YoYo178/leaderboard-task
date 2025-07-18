import { useMutationBase } from "../useMutationBase";
import APIEndpoints from "../../../config/APIEndpoints";

interface CreateUserInputBody {
    name: string
}

export const useCreateUserMutation = useMutationBase<CreateUserInputBody>(APIEndpoints.CREATE_USER, "Create user");