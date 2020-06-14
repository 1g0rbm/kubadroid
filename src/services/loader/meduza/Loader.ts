export default class Loader {
  private readonly api: INews

  constructor(api: INews) {
    this.api = api
  }

  public async load(): Promise<any> {
    const list = (await this.api.loadList(5))
      .filter((item: any) => {
        const { tag: { name } } = item

        return name !== 'новости' || name !== 'шапито'
      })

    const fullArticlesList = await Promise.all(list.map(async (item: any) => {
      const { url } = item
      const { root: { content: { body } } } = await this.api.loadOne(url)

      return body
    }))

    return fullArticlesList
      .reduce((acc: [], item: any): any[] => {
        if (!item) {
          return acc
        }

        //TODO: move this action to standalone normalizer
        return [
          ...acc,
          item.replace(/<style.+<\/style>/is, '')
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
        ]
      }, [])
      .filter((item: any) => !!item)
  }
}