import type { IGenerateID } from '@/api/interfaces'

export class TimeIdGenerate implements IGenerateID {
  public generate() {
    const id = String(new Date().getTime())
    return id
  }
}
