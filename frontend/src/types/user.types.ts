export interface User {
    name: string;
    points: number;
    pointsHistory: {
        pointsAdded: number;
        timestamp: number
    }[];
}