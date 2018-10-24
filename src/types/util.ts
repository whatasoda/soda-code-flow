export type Values<T> = T extends any[] ? T[number] : T[keyof T];
