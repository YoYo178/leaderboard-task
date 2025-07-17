import type { Request, Response } from "express"

export const getAllUsers = (req: Request, res: Response) => {
    console.log("getAllUsers")
}

export const getUser = (req: Request, res: Response) => {
    console.log("getUsers", req.params.userID)
}

export const createUser = (req: Request, res: Response) => {
    console.log("createUser", req.body)
}

export const addPointsToUser = (req: Request, res: Response) => {
    console.log("addPointsToUser", Math.floor(Math.random() * 10) + 1)
}