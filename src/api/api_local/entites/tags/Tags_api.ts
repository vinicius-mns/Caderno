import type { z } from 'zod'
import { Api_localStorage_as_db } from '../../Api_localStorage_as_db'
import { type ITag, tagsSchema } from './TagsTypes'
import type { IGenerateID } from '@/api/interfaces'
import { TimeIdGenerate } from '../generateId/TimeIdGenerate'

class TagDb extends Api_localStorage_as_db<ITag> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    // protected _initivalue: ITag[],
    protected _idGenerate: IGenerateID
  ) {
    super(key, _schema, _idGenerate)
  }

  public readList(idsList: string[]) {
    const listOfTags: ITag[] = idsList.map((id) => {
      try {
        return this.readOne(id)
      } catch (e) {
        return { id: '', content: 'not found', emoji: '✖️' }
      }
    })
    return listOfTags
  }

  public searchTag = (text: string, tags: ITag[]) => {
    const filtred = tags.filter((tag) => {
      const tagLowerContent = tag.content.toLowerCase()
      return tagLowerContent.includes(text.toLowerCase())
    })
    return filtred
  }
}

const key = 'tags_local'

// const initialValue: ITag[] = [
//   {
//     id: '1',
//     content: 'initial tag',
//     emoji: '🍓'
//   }
// ]

export const tagsLocalDb = () => new TagDb(key, tagsSchema, new TimeIdGenerate())
