import type { IGenerateID } from '@/api/interfaces'
import { v4 as uuidv4 } from 'uuid'

export class UuidGenerate implements IGenerateID {
  public generate() {
    const id = uuidv4()
    return id
  }
}
