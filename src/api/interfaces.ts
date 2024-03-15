export interface CRUD<T> {
  create: (ent: T) => void
  read: () => T
  update: (ent: T) => void
  delete: () => void
}
