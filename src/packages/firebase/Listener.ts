// firestore listener with callback
export type Listener<T> = (resolve: (items: T[]) => any) => () => void
