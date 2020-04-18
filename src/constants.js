export const KEYS = {
  title: 'title',
  createdBy: 'created_by',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

export const HEADERS = [
  {
    key: KEYS.title,
    title: 'Title'
  },
  {
    key: KEYS.createdBy,
    title: 'Created by'
  },
  {
    key: KEYS.createdAt,
    title: 'Created at',
    sortable: true
  },
  {
    key: KEYS.updatedAt,
    title: 'Last updated',
    sortable: true
  }
];

export const LOCAL_STORAGE_KEY = 'sortOrder';
