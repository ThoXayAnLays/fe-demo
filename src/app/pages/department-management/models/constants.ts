import { FilterFieldConfig } from '@vks/app/shared/ui-common/filter-common/filter-common.config';
import { IFilterForm } from '@vks/app/https/department-management/interfaces';
import {
  actionConfig,
  ITableHeaderConfig,
} from '@vks/app/shared/ui-common/table-common/table.common.config';
import { KeyAction } from '@vks/app/shared/models';

export const DefaultFilterData: IFilterForm = {
  name: '',
  code: '',
  description: '',
  active: true,
};

export const ListDepartmentActionConfig: actionConfig[] = [
  { label: 'Cập nhật', icon: 'pi pi-file-edit', key: KeyAction.UPDATE },
  { label: 'Xoá', icon: 'pi pi-trash', key: KeyAction.REMOVE },
];

export const FilterConfig: FilterFieldConfig[] = [
  {
    type: 'text',
    label: 'Tên phòng ban',
    name: 'name',
    placeholder: 'Nhập tên',
    col: 3,
  },
  {
    type: 'text',
    label: 'Mã phòng ban',
    name: 'code',
    placeholder: 'Nhập mã',
    col: 3,
  },
  {
    type: 'text',
    label: 'Mô tả',
    name: 'description',
    placeholder: 'Nhập mô tả',
    col: 3,
  },
  {
    type: 'select',
    label: 'Trạng thái',
    name: 'active',
    options: [
      { label: 'Hoạt động', value: 'true' },
      { label: 'Không hoạt động', value: 'false' },
    ],
    placeholder: 'Chọn trạng thái',
    defaultValue: 'true',
    col: 3,
  },
];

export const ConfigHeader: ITableHeaderConfig[] = [
  { key: 'name', name: 'Tên phòng ban' },
  { key: 'code', name: 'Mã phòng ban' },
  { key: 'description', name: 'Mô tả' },
  { key: 'active', name: 'Trạng thái' },
  { key: 'actions', name: 'Thao tác' }
];
