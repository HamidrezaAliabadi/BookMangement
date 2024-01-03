export type Task = {
    id: number,
    title: string,
    status: number  /*1-Pendding, 2-InProgress, 3-Done, otherwise None*/
}