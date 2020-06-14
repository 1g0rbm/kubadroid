interface ILoadable {
  load(uri: string): Promise<[]>
}
