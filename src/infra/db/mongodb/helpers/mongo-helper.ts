import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  uri: null as string,
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },
  async  disconnect () {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  }
}
