# Excel Editor for VUE 2

Vue2 plugin for displaying and editing the array-of-object in Excel style. It supports the following features:

- Excel-like UI
- Real 2-way data binding
- Column Filtering
- Column Sorting
- Pagination
- Row selection
- Update the cells in all selected rows
- Key support: Up, down, left, right, PageUp, PageDown, tab, shift-tab, esc
- Ctrl/meta Key support: Ctrl-A, Ctrl-C, Ctrl-V, Ctrl-Z, Ctrl-F, Ctrl-G, Ctrl-L
- Column Valiation
- Cell Error Tooltip
- Custom Column Header
- Readonly Column
- Column Visibility
- Column Sequence
- Column Width Adjustment
- Undo
- Copy & Paste
- Mass Import Excel Data

## Getting started

Get the package:
```bash
npm install vue-excel-editor
```

Register VueExcelEditor in your app entrypoint:
```js
import Vue from 'vue'
import VueExcelEditor from 'vue-excel-editor'

Vue.use(VueExcelEditor)
```

In your template
```html
<template>
    <vue-excel-editor v-model="jsondata">
        <vue-excel-column field="user"   label="User" />
        <vue-excel-column field="name"   label="Name" />
        <vue-excel-column field="phone"  label="Contact" />
        <vue-excel-column field="gender" label="Gender" />
        <vue-excel-column field="age"    label="Age" />
        <vue-excel-column field="birth"  label="Date Of Birth" />
    </vue-excel-editor>
</template>

```

## Outlook
![Simple Outlook](/assets/simple.png?raw=true "VueExcelEditor")

## Props List

#### Component: vue-excel-editor
| Name            | Mandatory | Type              | Description |
| :---            | :---      | :---              | ---         |
| v-model         | Mandatory | Array Of Objects  | AOO Data to be edited | 
| page            | Optional  | Number            | Specific page size, default is auto-calculating by screen height |
| n-filter-count  | Optional  | Number            | Number of items to be listed in filter dialog. Default is 200 |
| row-style       | Optional  | Function          | Conditional row formatting, default is null |
| no-paging       | Optional  | Boolean           | Disable paging feature, default is false |
| no-num-col      | Optional  | Boolean           | No number column, default is false |
| filter-row      | Optional  | Boolean           | Show fixed filter row, default is false |
| no-footer       | Optional  | Boolean           | No footer row, default is false |
| no-finding      | Optional  | Boolean           | Disable find key (ctrl-f) and finding dialog, default is false |
| no-finding-next | Optional  | Boolean           | Disable find-next key (ctrl-g), default is false |
| autocomplete    | Optional  | Boolean           | Enable autocomplete of all columns, default is false |
| readonly        | Optional  | Boolean           | Set all columns read only, default is false |
| readonly-style  | Optional  | Object            | The style of the read-only cell |

(TBD)

#### Component: vue-excel-column
| Name                 | Mandatory | Type     | Description |
| :---                 | :---      | :---     | :---        |
| field                | Mandatory | String   | Row Object Key |
| label                | Optional  | String   | Header Label, default is field |
| type                 | Optional  | String   | Column type: 'string'(default), 'number', 'select', 'money', 'check10', 'checkYN', 'checkTF', 'date', 'datetime', 'datetimesec', 'datetick', 'datetimetick', 'datetimesectick' |
| readonly             | Optional  | Boolean  | Read-only, default is parent prop: readonly |
| init-style           | Optional  | Object   | Cell inital style in css |
| width                | Optional  | String   | Specified Column Width, default is 100px |
| validate             | Optional  | Function | Custom Function to validate and return the error message |
| key-field*           | Optional  | Number   | Sequence number to create record key, default is 0 = Not key field |
| allow-edit-when-new* | Optional  | Boolean  | Allow edit (For readonly column) when it is new record |
| allow-keys*          | Optional  | Array    | Array of char which allow to input |
| mandatory*           | Optional  | String   | If the content is blank, show this warning, default is '' |
| lengthLimit*         | Optional  | Number   | Not allow to input when the content length reaches the limit |
| autocomplete         | Optional  | Boolean  | Allow autocomplete popup when editing, default is parent prop: autocomplete |
| pos                  | Optional  | Number   | Specified column sequence |
| text-transform       | Optional  | String   | Force the input to upppercase or lowercase when editing |
| text-align*          | Optional  | String   | Text alignment, default is 'left' |
| options              | Optional  | Array    | Define the selectable options, if type != 'select, it works as autocomplete |
| to-text              | Optional  | Function | The custom conversion function from object value to edit-text |
| to-value             | Optional  | Function | The custom conversion function from edit-text to object value |

(TBD)
* - Still Under Testing

## Hot Key List

| Name             | Condition          | Description |
| :---             | :---               | :---        |
| Ctrl/Meta A      | Table Focus        | Select all rows |
| Ctrl/Meta C      | Cell Focus         | Select the cell text to clipboard |
| Ctrl/Meta V      | Cell Focus         | Place the clipboard text to cell |
| Ctrl/Meta Z      | Table Focus        | Undo the last update |
| Ctrl/Meta F      | Table Focus        | Popup the "Find" dialog |
| Ctrl/Meta G      | After "Find"       | Continue to find the text |
| Ctrl/Meta L      | Cell Focus         | Force to show autocomplete list, or the option list for "select" typed column |

(TBD)



## Events List

#### Component: vue-excel-editor
| Name             | Argument          | Description |
| :---             | :---              | :---        |
| update           | Array Of Array    | Update Cell information |

(TBD)

## Methods List

#### Component: vue-excel-editor
| Name             | Argument             | Description |
| :---             | :---                 | :---        |
| exportTable      | format, selectedOnly | export the filtered table as xlsx/csv |
| clearAllSelected |                      | Unselect all selected rows |
| undoTransaction  |                      | Undo the latest update |

(TBD)

## Example

```js
export default {
    name: 'app',
    data: {
        jsondata: [
            {key: 'U0001', user: 'kc', name: 'Kenneth Cheng', phone: '852-1234-5678', gender: 'M', age: 25, birth: '1997-07-01'},
            {key: 'U0002', user: 'sm', name: 'Simon Minolta', phone: '852-1234-5682', gender: 'M', age: 20, birth: '1999-11-12'},
            {key: 'U0003', user: 'ra', name: 'Raymond Atom', phone: '852-1234-5683', gender: 'M', age: 18, birth: '2000-06-11'},
            {key: 'U0004', user: 'ag', name: 'Mary George', phone: '852-1234-5684', gender: 'F', age: 22, birth: '2002-08-01'},
            {key: 'U0005', user: 'kl', name: 'Kenny Linus', phone: '852-1234-5685', gender: 'M', age: 29, birth: '1990-09-01'}
        ]
    },
    method: {
        validPhoneNum (content) {
            if (content === '') return 'Mandatory field'
            if (!/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(content)) return 'Invalid Phone Number'
            return ''
        }
    }
}
```

## Work with redis for saving

```html
<vue-excel-editor v-model="jsondata" @update="save">
...
</vue-excel-editor>
```
```js
methods: {
    save (record) {
      record = record.map(rec => ['hset', rec.key, rec.field, rec.newVal])
      redis.multi(record).exec()
    }
}
```

#### Important
The Array-Of-Object (AOO) data is required an unique "key" field to operate

In your HTML call it likes

```html
<template>
    <vue-excel-editor v-model="jsondata" no-footer no-paging autocomplete filter-row>
        <vue-excel-column field="user"   label="User ID"       type="string" width="80px" readonly />
        <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
        <vue-excel-column field="phone"  label="Contact"       type="string" width="130px" :validate="validPhoneNum" />
        <vue-excel-column field="gender" label="Gender"        type="select" width="50px" :options="['F','M','U']" />
        <vue-excel-column field="age"    label="Age"           type="number" width="70px" />
        <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="80px" />
    </vue-excel-editor>
</template>
```
#### Filter + Footer Rows
![Filter + Footer Rows](/assets/footerfilter.png?raw=true "Filter + Footer Rows")

#### Filtering
![Filtering](/assets/filtering.png?raw=true "Filtering")

#### Sorting
![Sorting](/assets/sorting.png?raw=true "Sorting")

#### Options
![Options](/assets/options.png?raw=true "Options")

#### Autocomplete
![Autocomplete](/assets/autocomplete.png?raw=true "Autocomplete")

#### Select
![Select](/assets/select.png?raw=true "Select")

#### Validation
![Validation](/assets/validate.png?raw=true "Validation")

## License
MIT

## Status
This project is in an early stage of development. Any contribution is welcome :D
