export interface User {
    _id?: string;
    name: string;
    points: number;
    pointsHistory: {
        pointsAdded: number;
        timestamp: number
    }[];
}