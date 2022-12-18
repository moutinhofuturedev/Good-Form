// --------> post typing <--------
export interface FormData {
    name: string
    email: string
    password: string
    privacyTerms: boolean
    profession: string
    createdAt: string
}

// --------> get typing <--------

export interface ListProps {
    name: string 
    email: string 
    password: string 
    profession: string 
    createdAt: string
    id: number
}