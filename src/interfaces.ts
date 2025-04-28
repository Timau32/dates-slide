export interface TimeEvent {
    id: number;
    year: number;
    description: string;
}

export interface TimePeriod {
    id: number;
    periods: number[];
    color: string;
    category: string;
    categoryNumber: number;
    events: TimeEvent[];
}