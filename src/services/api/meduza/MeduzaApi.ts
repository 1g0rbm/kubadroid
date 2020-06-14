import axios from 'axios'

export default class MeduzaApi implements INews {

  private readonly host: string

  constructor() {
    this.host = 'https://meduza.io'
  }

  public async loadOne(uri: string): Promise<any> {
    const url: URL = new URL('/api/v3/' + uri, this.host)

    const response = await axios.get(url.href)

    return response.data
  }

  public async loadList(newsCount: number): Promise<[]> {
    const params: URLSearchParams = new URLSearchParams({
      chrono: 'news',
      page: '0',
      per_page: <string><unknown>newsCount,
      locale: 'ru'
    })

    const url: URL = new URL('/api/v3/search', this.host)
    url.search = params.toString()

    const { data: { documents, collection } } = await axios.get(url.href)

    return collection.reduce((acc: [], item: string) => [...acc, documents[item]], [])
  }
}