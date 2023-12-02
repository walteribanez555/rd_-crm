import { SubMenuItem } from "./subMenu.model";

export interface routeSideNav{
  label: string,
  isDropdownOpen :boolean,
  dropdownHeight : string,
  icon : string,
  submenuItems: SubMenuItem[]

}
