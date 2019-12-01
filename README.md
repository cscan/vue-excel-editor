# Excel Editor for VUE 2

Vue2 plugin for displaying and editing the array-of-object in Excel style. It supports the following features:

- Excel-like UI
- Up, down, left, right Navigation
- Column Filter
- Column Sort (One column only)
- Multi-select row (Shift support)
- Update the cells in selected rows
- Remember the selection during paging
- PageUp, PageDown key support
- Select-all, De-Select-all
- Custom Column Validation
- Custom Error Tooltip
- Custom Record Label
- Custom Column Header
- Predefine the Column Width, User-adjustable Column Width
- Auto and Custom Page size (Responsive)
- Custom Readonly Column

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
    <vue-excel-editor v-model="jsondata" :n-fields="5">
        <template v-slot:body="props">
            <vue-excel-column v-model="props.record['user']" field="user" label="User" />
            <vue-excel-column v-model="props.record['name']" field="name" label="Name" />
            <vue-excel-column v-model="props.record['phone']" field="phone" label="Phone" />
            <vue-excel-column v-model="props.record['age']" field="age" label="Age" />
            <vue-excel-column v-model="props.record['birth']" field="birth" label="Birth" />
        </template>
    </vue-excel-editor>
</template>

```

## Props List

#### Component: vue-excel-editor
| Name             | Type              | Description |
| :---             | :---:             | ---         |
| v-model          | Array Of Objects  | AOO Data to be edited | 
| n-fields         | Number            | Number of fields in table |
| page             | Number            | Specific page size. If not provided, component will calculate automatically |
| n-filter-count   | Number            | Number of items to be listed in filter dialog. Default is 200 |
| new-record       | Function          | The handler of the new record request (Under testing) |
| :---             | :---:             | ---         |

(TBD)

#### Component: vue-excel-column
| Name             | Type              | Description |
| :---             | :---:             | ---         |
| v-model          | String            | The Object to be edited |
| field            | String            | Object Key |
| label            | String            | Header Label |
| type             | String            | Column type: 'string', 'number', 'money', 'check10', 'checkYN', 'checkTF', 'date', 'datetime', 'datetimesec', 'datetick', 'datetimetick', 'datetimesectick' |
| readonly         | Boolean           | Allow to edit or not |
| init-style       | String            | Additional Column CSS |
| validate         | Function          | Function to return the error message |
| interactive      | Boolean           | Specify true if the update event will be trigger during editing |
| upper-case       | Boolean           | Specify True if you want to force upper-case |
| accept-enter     | Boolean           | Allow multi-line in cell |
| to-text          | Function          | The conversion function from object value to edit-text |
| to-value         | Function          | The conversion function from edit-text to object value |
| :---             | :---:             | ---         |

(TBD)

## Events List

#### Component: vue-excel-editor
| Name             | Argument          | Description |
| :---             | :---:             | ---         |
| update           | Array Of Array    | Update Cell information |
| :---             | :---:             | ---         |

(TBD)

## Methods List

#### Component: vue-excel-editor
| Name             | Argument          | Description |
| :---             | :---:             | ---         |
| :---             | :---:             | ---         |

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
<vue-excel-editor v-model="json_data" :n-fields="5">
    <template v-slot:body="props">
        <vue-excel-column v-model="props.record['user']" field="user" label="User" />
        <vue-excel-column v-model="props.record['name']" field="name" label="Name" />
        <vue-excel-column v-model="props.record['phone']" field="phone" label="Phone" />
        <vue-excel-column v-model="props.record['age']" field="age" label="Age" />
        <vue-excel-column v-model="props.record['birth']" field="birth" label="Birth" />
    </template>
</vue-excel-editor>
```

## License
MIT

## Status
This project is in an early stage of development. Any contribution is welcome :D

## Keywords
vue vue2 vuejs excel data grid table v-model editor editable javascript DHTML no-jquery grid-editor online-editor data-grid data-table spreadsheet tabular-data edit-cell editable-table data-spreadsheet bootstrap responsive navigatable contenteditable
