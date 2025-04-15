export interface Pet {
    id?: number;
    name: string;
    description: string;
    dateLost: Date;
    location: string;
    contactInfo: string;
    imageUrl?: string;
    isLost?: boolean;
    createdAt?: Date;
}