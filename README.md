# Excel Editor for VUE 2

Vue2 plugin for displaying and editing the array-of-object in Excel style. It supports the following features:

- Excel-like UI
- Column Filtering
- Column Sorting
- Pagination
- Row selection
- Update the cells in all selected rows
- Key support: Up, down, left, right, PageUp, PageDown, tab, shift-tab
- Column Valiation
- Cell Error Tooltip
- Custom Record Label
- Custom Column Header
- Readonly Column
- Column Visibility
- Column Sequence
- Column Width Adjustment
- Undo
- Copy & Paste (Under Testing)

## Getting started

Get the package:
```bash
npm install vue-excel-editor
```

Register VueExcelEditor in your app entrypoint:
```js
import Vue from 'vue'
import VueExcelEditor from 'vue-excel-editor'

Vue.component('vue-excel-editor', VueExcelEditor)
```

In your template
```html
<template>
    <vue-excel-editor v-model="jsondata">
        <vue-excel-column field="user" label="User" />
        <vue-excel-column field="name" label="Name" />
        <vue-excel-column field="phone" label="Phone" />
        <vue-excel-column field="age" label="Age" />
        <vue-excel-column field="birth" label="Birth" />
    </vue-excel-editor>
</template>

```

## Props List

#### Component: vue-excel-editor
| Name           | Mandatory | Type              | Description |
| :---           | :---      | :---:             | ---         |
| v-model        | Mandatory | Array Of Objects  | AOO Data to be edited | 
| page           | Optional  | Number            | Specific page size, default is auto-calculating by screen height |
| n-filter-count | Optional  | Number            | Number of items to be listed in filter dialog. Default is 200 |
| row-style      | Optional  | Function          | Conditional row formatting, default is null |
| no-paging      | Optional  | Boolean           | Disable paging feature, default is false |

(TBD)

#### Component: vue-excel-column
| Name         | Mandatory | Type     | Description |
| :---         | :---      | :---:    | ---         |
| field        | Mandatory | String   | Row Object Key |
| label        | Optional  | String   | Header Label, default is field |
| type         | Optional  | String   | Column type: 'string' (default), 'number', 'money', 'check10', 'checkYN', 'checkTF', 'date', 'datetime', 'datetimesec', 'datetick', 'datetimetick', 'datetimesectick' |
| readonly     | Optional  | Boolean  | Read-only, default is false |
| init-style   | Optional  | String   | Style in CSS |
| width        | Optional  | String   | Specified Column Width, default is 100px |
| validate     | Optional  | Function | Custom Function to validate and return the error message |
| pos          | Optional  | Number   | Specified column sequence |
| upper-case   | Optional  | Boolean  | Specify True if you want to force upper-case |
| to-text      | Optional  | Function | The custom conversion function from object value to edit-text |
| to-value     | Optional  | Function | The custom conversion function from edit-text to object value |

(TBD)

## Events List

#### Component: vue-excel-editor
| Name             | Argument          | Description |
| :---             | :---:             | ---         |
| update           | Array Of Array    | Update Cell information |

(TBD)

## Methods List

#### Component: vue-excel-editor
| Name             | Argument  | Description |
| :---             | :---:     | ---         |
| exportTable      | format    | export the filtered table as xlsx/csv |
| clearAllSelected |           | Unselect all selected rows |
| undoTransaction  |           | Undo the latest update |

(TBD)

## Example

```js
import Vue from 'vue'
import VueExcelEditor from 'vue-excel-editor'

Vue.component('vue-excel-editor', VueExcelEditor)

const app = new Vue({
    el: '#app',
    data: {
        json_data: [
            {key: 'U0001', user: 'kc', name: 'Kenneth Cheng', phone: '852-1234-5678', age: 25, birth: '1997-07-01'},
            {key: 'U0002', user: 'sm', name: 'Simon Minolta', phone: '852-1234-5682', age: 20, birth: '1999-11-12'},
            {key: 'U0003', user: 'ra', name: 'Raymond Atom', phone: '852-1234-5683', age: 18, birth: '2000-06-11'},
            {key: 'U0004', user: 'ag', name: 'Anderson George', phone: '852-1234-5684', age: 22, birth: '2002-08-01'},
            {key: 'U0005', user: 'kl', name: 'Kenny Linus', phone: '852-1234-5685', age: 29, birth: '1990-09-01'}
        ]
    }
})
```

#### Important
The Array-Of-Object (AOO) data is required an unique "key" field to operate

In your HTML call it likes

```html
<template>
    <vue-excel-editor v-model="jsondata">
        <vue-excel-column field="user" label="User ID" type="string" width="80px" readonly />
        <vue-excel-column field="name" label="Name" type="string" width="150px" />
        <vue-excel-column field="phone" label="Phone Number" type="string" width="130px" :validate="validPhoneNum" />
        <vue-excel-column field="age" label="Age" type="number" width="70px" />
        <vue-excel-column field="birth" label="Date Of Birth" type="date" width="80px" />
    </vue-excel-editor>
</template>
```

## License
MIT

## Status
This project is in an early stage of development. Any contribution is welcome :D

## Keywords
vue vue2 vuejs excel data grid table v-model editor editable javascript DHTML no-jquery grid-editor online-editor data-grid data-table spreadsheet tabular-data edit-cell editable-table data-spreadsheet bootstrap responsive navigatable contenteditable
