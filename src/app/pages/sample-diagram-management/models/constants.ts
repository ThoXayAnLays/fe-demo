export const constant = 'constant'

export const collapseDiagramPageSize = 6
export const collapseDiagramPageDefault = 0

export const regexNameDiagram = /^[a-zA-ZÀÁẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶÊẾỀỂỄỆÔỐỒỔỖỘƠỚỜỞỠỢ0-9.: ]*$ /

export enum Colors {
    black = '#000000',
    while = '#FFFFFF',
}

export const TEXT_TITLE = {
    SAVE: 'Lưu',
    CANCEL: 'Hủy',
    DIAGRAM_INFO: 'Thông tin sơ đồ',
    EDIT_NAME: 'Sửa tên',
    SAVE_NAME: 'Lưu tên',
    PROPERTIES: 'Thuộc tính',
    TEXT: 'Văn bản',
    TEXT_STYLE: 'Kiểu chữ',
    TEXT_SIZE: 'Cỡ chữ',
    TEXT_FONT: 'Font chữ',
    TEXT_COLOR: 'Màu chữ',
    BACKGROUND_COLOR: 'Màu nền',
    NAME_NOT_NULL: 'Tên không được để trống',
    NAME_NOT_FORMAT: 'Tên không được chứa ký tự đặc biệt',
    CLOSE: 'Đóng',
    EDIT_NODE_TITLE: 'Sửa tiêu đề',
    NODE_TEXT: 'Văn bản',
    NODE_FONT_SIZE: 'Cỡ chữ',
    NODE_FONT_STYLE: 'Kiểu chữ',
    NODE_FONT: 'Font chữ',
    NODE_FONT_COLOR: 'Màu chữ',
    NODE_BACKGROUND_COLOR: 'Màu nền',
    NODE_SELECT_TITLE_NOT_EDIT: 'Chọn tiêu đề để sửa',
    NODE_SELECT_TITLE: 'Chọn tiêu đề',
};

export const textType = [
    { name: 'Bold', code: 'bold' },
    { name: 'Italic', code: 'italic' },
];

export const textFont = [
    { name: 'Helvetica', code: 'Helvetica, Arial, sans-serif' },
    { name: 'Arial', code: 'Arial, sans-serif' },
    { name: 'Times New Roman', code: 'Times New Roman, Times, serif' },
];

export const textFontSize = [
    { name: '8', code: '8' },
    { name: '10', code: '10' },
    { name: '12', code: '12' },
    { name: '14', code: '14' },
    { name: '16', code: '16' },
    { name: '18', code: '18' },
    { name: '20', code: '20' },
    { name: '24', code: '24' },
];

export const nodeDiagram = {
    imageIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="black" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/></svg>',
    textIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="black" d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/></svg>'
};