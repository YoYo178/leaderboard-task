export type HTTP_METHODS = "GET" | "PATCH" | "PUT" | "POST" | "DELETE" | "OPTIONS";

type USER_ROUTES = "GET_ALL_USERS" | "GET_USER" | "CREATE_USER" | "ADD_POINT_TO_USER";

type API_ROUTES = USER_ROUTES;

export type Endpoint = {
    URL: string;
    METHOD: HTTP_METHODS;
}

export type Endpoints = {
    [key in API_ROUTES]: Endpoint
}