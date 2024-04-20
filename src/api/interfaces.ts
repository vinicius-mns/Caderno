export interface WithID {
  id: string
}

export interface CRUD<T> {
  create: (ent: T) => void
  read: () => T
  update: (ent: T) => void
  delete: () => void
}

export interface IGenerateID {
  generate: () => string
}

export interface DB_CRUD<T extends WithID> {
  create: (entDb: T[]) => void
  createOne: (ent: T) => void
  read: () => T[]
  readOne: (id: string) => T
  update: (entDb: T[]) => void
  updateOne: (id: string, ent: T) => void
  delete: () => void
  deleteOne: (id: string) => void
}
