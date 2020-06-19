export default class Loader {
  private readonly api: INews

  constructor(api: INews) {
    this.api = api
  }

  public async load(count: number = 5): Promise<ILoadableResponse[]> {
    const list = (await this.api.loadList(count))
      .filter((item: any) => {
        const { tag: { name } } = item

        return name !== 'новости' || name !== 'шапито'
      })

    const fullArticlesList = await Promise.all(
      list.map(async (item: any): Promise<ILoadableResponse> => {
        const { url, title } = item
        const { root: { content: { body } } } = await this.api.loadOne(url)

        return { title: title, text: body }
      }))


    return fullArticlesList
      .reduce((acc: ILoadableResponse[], { title, text }): ILoadableResponse[] => {
        if (!text || !title) {
          return acc
        }

        return [
          ...acc,
          {
            title,
            text: text.replace(/<style.+<\/style>/is, '')
              .replace(/<script.+<\/script>/is, '')
              .replace(/<div class="Related".+<\/div>/is, '')
              .replace(/<div class="EmbedCode".+<\/div>/is, '')
              .replace(/<div class="Lead".+/is, '')
              .replace(/<div id="SharePicture.+<\/div>/is, '')
              .replace(/<button.+<\/button>/is, '')
              .replace(/<figure.+<\/figure>/is, '')
              .replace(/<[^>]+>/g, '')
              .replace(/\n/g, '')
              .replace(/\s{2,}/g, '')
              .trim()
          }
        ]
      }, [])
      .filter(({ text }) => !!text && text.length <= 5000)
      .slice(count)
  }
}