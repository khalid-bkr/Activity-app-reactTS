export interface UserActivity {
    date: string
    summary: Summary[]
    segments: Segment[]
    caloriesIdle: number
    lastUpdate: string
}

export interface Summary {
    activity: string
    group: string
    duration: number
    distance: number
    steps: number
    calories: number
}

export interface Segment {
    type: string
    startTime: string
    endTime: string
    place?: Place
    activities?: Activity[]
    lastUpdate: string
}

export interface Place {
    id: number
    name?: string
    type: string
    location: Location
    foursquareId?: string
    foursquareCategoryIds: any
}

export interface Location {
    lat: number
    lon: number
}

export interface Activity {
    activity: string
    group: string
    manual: boolean
    startTime: string
    endTime: string
    duration: number
    distance: number
    steps?: number
    calories?: number
    trackPoints: any[]
}
