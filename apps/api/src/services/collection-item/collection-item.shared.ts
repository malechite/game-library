import type { CollectionItemService } from "./collection-item.class";

export type {
  CollectionItem,
  CollectionItemData,
  CollectionItemPatch,
  CollectionItemQuery,
  CollectionImportData
} from "./collection-item.class";

export const collectionItemMethods: Array<keyof CollectionItemService> = ["find", "get", "create", "patch", "remove", "import"];
