export type AdminModuleKey =
  | "products"
  | "categories"
  | "inventory"
  | "orders"
  | "sourcing-requests"
  | "customers"
  | "pricing-fees"
  | "content"
  | "notifications"
  | "reports"
  | "settings"
  | "audit-logs"

export type AdminModuleConfig = {
  key: AdminModuleKey
  title: string
  menuLabel: string
  purpose: string
  keyScreens: string[]
  tableColumns: string[]
  tableRows: string[][]
  sortableFields: string[]
  filterableFields: string[]
  coreActions: string[]
  bulkActions: string[]
  statusFlow: string[]
  validations: string[]
}
