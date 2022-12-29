// --------> post typing <--------
export interface FormData {
    name: string
    email: string
    password: string
    privacyTerms?: boolean
    profession: string
    createdAt?: string
    updatedAt?: string
}

// --------> get typing <--------

export interface ListProps {
    name: string 
    email: string  
    profession: string 
    createdAt: string
    updatedAt: string
    id: number
}

// --------> patch typing <--------
export interface UpdateProps {
    name: string
    email: string
    password: string
    profession: string
    id: number
}