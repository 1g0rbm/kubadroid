interface INews {
  loadOne(uri: string): Promise<any>

  loadList(newsCount: number): Promise<[]>
}