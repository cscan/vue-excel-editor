# Excel Editor for VUE 2

Vue2 plugin for displaying and editing the array-of-object in Excel style. It supports the following features:

- Excel-like UI
- Real 2-way data binding
- Column filtering
- Column sorting
- Export to Excel/CSV
- Pagination
- Row selection
- Update the cells in all selected rows
- Edit key support: up, down, left, right, page-up, page-down, tab, del, bs, enter, esc
- Ctrl/meta key support: Ctrl-A, Ctrl-C, Ctrl-V, Ctrl-Z, Ctrl-F, Ctrl-G, Ctrl-L
- Column validation
- Cell error tooltip
- Custom column header
- Custom Row style
- Readonly column
- Column visibility
- Column sequence
- Column width adjustment
- Undo update
- Copy & Paste
- Mass import Excel data

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

![Simple Outlook](https://i.imgur.com/bFOA5Lv.png "VueExcelEditor")

## Props List

### Prop Component: vue-excel-editor

| Name                  | Mandatory | Type     | Description |
| :---                  | :---      | :---     | :---        |
| v-model               | Mandatory | Array    | Edited data in Array Of Object | 
| page                  | Optional  | Number   | Specific page size, default is auto-calculating by screen height |
| no-paging             | Optional  | Boolean  | Disable paging feature, default is false |
| no-num-col            | Optional  | Boolean  | No number column, default is false |
| filter-row            | Optional  | Boolean  | Show fixed filter row, default is false |
| no-footer             | Optional  | Boolean  | No footer row, default is false |
| no-finding            | Optional  | Boolean  | Disable find key (ctrl-f) and finding dialog, default is false |
| no-finding-next       | Optional  | Boolean  | Disable find-next key (ctrl-g), default is false |
| free-select           | Optional  | Boolean  | Select multiple rows without pressing ctrl/meta key |
| autocomplete          | Optional  | Boolean  | Enable autocomplete of all columns, default is false |
| autocomplete-count    | Optional  | Number   | The maximum length of the autocomplete list, default is 50 |
| readonly              | Optional  | Boolean  | Set all columns read only, default is false |
| readonly-style        | Optional  | Object   | The style of the read-only cell |
| height                | Optional  | String   | Define the exact height in px of the component, default is 'auto' |
| width                 | Optional  | String   | Define the maximum width in px of the component, default is '100%' |
| row-style             | Optional  | Function | Conditional row formatting, default is null |
| cell-style            | Optional  | Function | Conditional cell formatting, default is null |
| header-label          | Optional  | Function | Func to return the label, parameter are the field label, field object |
| record-label          | Optional  | Function | Func to return the label, parameters are recordPosition, record object |
| localized-label       | Optional  | Object   | Customize labels and messages for localization purpose |
| n-filter-count        | Optional  | Number   | Number of items to be listed in filter dialog. Default is 200 |
| remember              | Optional  | Boolean  | Remember the setting in localStorage, default is false |
| enterToSouth          | Optional  | Boolean  | Move the cell to bottom instead of right when hits enter |
| allow-add-col         | Optional  | Boolean  | Allow to show the add column button during column resize |
| add-column            | Optional  | Function | Func to return the column definition when column is adding |
| no-header-edit        | Optional  | Boolean  | Not allow header label editing |
| spellcheck            | Optional  | Boolean  | Turn on spellcheck during editing |
| new-if-bottom         | Optional  | Boolean  | New record if focusing cell reach bottom |
| disable-panel-setting | Optional  | Boolean  | Hide the setting panel |
| disable-panel-filter  | Optional  | Boolean  | Hide the filter panel |
| no-mouse-scroll       | Optional  | Boolean  | Disable the vertical scrolling by mouse |

### Prop Component: vue-excel-column

| Name           | Mandatory | Type              | Description |
| :---           | :---      | :---              | :---        |
| field          | Mandatory | String            | Field name, row object key |
| label          | Optional  | String            | Header label, default is field name |
| type           | Optional  | String            | The column type |
| readonly       | Optional  | Boolean           | Read-only, default is parent prop: readonly |
| init-style     | Optional  | Object            | Cell inital style in css |
| sticky         | Optional  | Boolean           | Fixed column at left of the table, no response on horizontal scrolling |
| invisible      | Optional  | Boolean           | Column visibility, default is false |
| width          | Optional  | String            | Specified column width, default is '100px' |
| change         | Optional  | Function@         | The function to be triggered when the data of this column changed |
| validate       | Optional  | Function          | The function to validate and return the error message |
| key-field      | Optional  | Boolean           | Specified the key field which is included in keys parameter in @update event |
| allow-keys     | Optional  | Array, Function   | Array of char which allow to input |
| mandatory      | Optional  | String            | If not empty, it is showed as error when it modified as blank, default is '' |
| length-limit   | Optional  | Number            | Not allow to input when the content length reaches the limit |
| autocomplete   | Optional  | Boolean           | Allow autocomplete popup when editing, default is parent prop: autocomplete |
| pos            | Optional  | Number            | Specified column sequence |
| text-transform | Optional  | String            | Force the input to upppercase or lowercase when editing |
| text-align     | Optional  | String            | Text alignment, default is 'left' |
| options        | Optional  | Array, Function@  | For type = 'select', define the selectable options in array |
| options        | Optional  | Object, Function  | For type = 'map', define the selectable options in hash |
| summary        | Optional  | String            | Summary: 'sum', 'avg', 'max', 'min'. Default is null |
| sort           | Optional  | Function          | The custom function for sorting the column |
| link           | Optional  | Function          | The function to react to the alt-click on cell text |
| to-text        | Optional  | Function          | The function to convert from object value to edit-text |
| to-value       | Optional  | Function          | The function to convert from edit-text to object value |

@ - Function can return a promise

#### Column type
| Type            | Value               | Display text        | Justify | Validation         | Allow Keys   | Allow Null |
| :---            | :---                | :---                | :---    | :---               | :--          | :--: |
| string          | string              | string              | left    | none               | all          | Y |
| number          | numeric             | numeric             | right   | none               | -.0123456789 | Y |
| select          | array               | string              | left    | value with options | all          | Y |
| map             | hash                | string              | left    | value with options | all          | Y |
| check10         | 1 or 0              | 1 or 0              | center  | none               | 1 or 0       | Y |
| checkYN         | Y or N              | Y or N              | center  | none               | ynYN         | Y |
| checkTF         | T or F              | T of F              | center  | none               | tfTF         | Y |
| date            | yyyy-mm-dd          | yyyy-mm-dd          | left    | valid date         | none         | Y |
| datetime        | yyyy-mm-dd hh:mn    | yyyy-mm-dd hh:mn    | left    | valid datetime     | none         | Y |
| datetimesec     | yyyy-mm-dd hh:mn:ss | yyyy-mm-dd hh:mn:ss | left    | valid datetimesec  | none         | Y |
| datetick        | unix timestamp      | yyyy-mm-dd          | left    | valid date         | none         | Y |
| datetimetick    | unix timestamp      | yyyy-mm-dd hh:mn    | left    | valid datetime     | none         | Y |
| datetimesectick | unix timestamp      | yyyy-mm-dd hh:mn:ss | left    | valid datetimesec  | none         | Y |

## Hot Key List

| Name        | Condition   | Description |
| :---        | :---        | :---        |
| Ctrl/Meta A | Table Focus | Select all rows |
| Ctrl/Meta C | Cell Focus  | Select the cell text to clipboard |
| Ctrl/Meta V | Cell Focus  | Place the clipboard text to cell |
| Ctrl/Meta Z | Table Focus | Undo the last update |
| Ctrl/Meta F | Table Focus | Popup the "Find" dialog |
| Ctrl/Meta G | After Find  | Continue to find the text |
| Ctrl/Meta L | Cell Focus  | Force to show autocomplete list, or the option list for "select" typed column |

## Events List

### Event Component: vue-excel-editor

| Name           | Arguemnts                   | Description |
| :---           | :---                        | :---        |
| update         | updateItemArray             | Update cell information |
| delete         | deleteItemArray             | Delete row information |
| select         | selectIdArray, direction    | Emit when rows are selected/unselected |
| cell-click     | rowPos, colPos              | Emit when a cell be clicked before focus |
| cell-focus     | {rowPos, colPos, cell, rec} | Emit when a cell got focus |
| page-changed   | pageTopPos, pageBottomPos   | Emit when the page has changed |
| setting        | setting                     | Emit when setting (column width, invisible state) is changed |
| validate-error | error, row, field           | Emit when validation (both field and row level) occured |

## Methods List

### Method Component: vue-excel-editor

| Name                  | Arguments         | Description |
| :---                  | :---              | :---        |
| firstPage             |                   | Move to the first page |
| lastPage              |                   | Move to the last page |
| prevPage              |                   | Move to the previous page |
| nextPage              |                   | Move to the next page |
| moveNorth             |                   | Move the cursor cell to upper cell |
| moveSouth             |                   | Move the cursor cell to lower cell |
| moveWest              |                   | Move the cursor cell to previous cell |
| moveEast              |                   | Move the cursor cell to next cell |
| moveTo                | row, col*         | Move the cursor cell to cell(row, col) |
| moveToNorthWest       |                   | Move the cursor cell to 1st row 1st col |
| moveToNorthEast       |                   | Move the cursor cell to 1st row last col |
| moveToSouthWest       |                   | Move the cursor cell to last row 1st col |
| moveToSouthEast       |                   | Move the cursor cell to last row last col |
| doFind                | text              | Find the specified text in whole table and locate the cursor cell |
| doFindNext            |                   | Contnue the last find |
| sort                  | n, pos            | Sort the column specified by pos, n = 1 (ascending) or -1 (descending) |
| newRecord             | rec*              | Call this to new an empty record, return the rec pointer |
| deleteRecord          | rowpos            | Delete the record in pos rowpos |
| deleteSelectedRecords |                   | Delete all the selected records |
| selectRecord          | row               | Select the row |
| selectRecordByKeys    | keys              | Select the row by keys hash |
| selectRecordById      | id                | Select the row by $id |
| unSelectRecord        | row               | UnSelect the row |
| clearAllSelected      |                   | Unselect all selected rows |
| getSelectedRecords    |                   | Get an array of the selected row hash |
| exportTable           | fmt*              | Export the filtered table as xlsx/csv |
| importTable           | callback*         | Import the specified formatted xlsx |
| undoTransaction       |                   | Undo the last update |
| setFilter             | name, text        | Set the filter text on column name |
| clearFilter           | name*             | Clear the filter text on column name |
| columnSuppress        |                   | Hide the column if all values are null or empty |
| calSummary            |                   | Calculate the summary of all columns |
| getFieldByName        | name              | Get the field object by name |
| getFieldByLabel       | label             | Get the field object by label |
| setRowError           | error, row        | Set the row validation error |
| setFieldError         | error, row, field | Set the row validation error |

&#42; = optional argument

## Variable List

### Variable Component: vue-excel-editor

| Name          | Type    | Description |
| :---          | :---    | :---        |
| processing    | Boolean | Component is busy or not |
| pageTop       | Number  | The top row number of the current page |
| pageSize      | Number  | The number of rows of each page |
| fields        | AOO     | It contains the column spec create when mount |
| filterColumn  | Object  | Contains the current filters, developer can access the filter string via this |
| table         | AOO     | It contains the filtered records |
| selected      | Object  | Contains all the selected rows, the key is row number and the value is internal $id |
| selectedCount | Number  | Number of rows are selected |
| errmsg        | Object  | Contains all the validation error messages, the key is internal $id plus field name |
| redo          | AOA     | The buffer of undo, it will be removed after undo or table changed |

AOA = Array of Array, i.e. [[...], [...]]  
AOO = Array of Object, i.e. [{...}, {...}]

I suppose you try to read all the above variables only. Do not try to modify any value of the above variables, unless you deeply walk through the codes and know the consequences.

## Example

An example to show 5x6 table:

```html
<template>
    <vue-excel-editor v-model="jsondata" filter-row>
        <vue-excel-column field="user"   label="User ID"       type="string" width="80px" />
        <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
        <vue-excel-column field="phone"  label="Contact"       type="string" width="130px" />
        <vue-excel-column field="gender" label="Gender"        type="select" width="50px" :options="['F','M','U']" />
        <vue-excel-column field="age"    label="Age"           type="number" width="70px" />
        <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="80px" />
    </vue-excel-editor>
</template>
```

Note that the component will read the vue-excel-column when it is created. You may also skip all the column definitions. The control will help you to "guess" the rest:

```html
<template>
    <vue-excel-editor v-model="jsondata" filter-row />
</template>
```

The sample data contains 5 records:

```js
export default {
    name: 'app',
    data: {
        jsondata: [
            {user: 'hc', name: 'Harry Cole',    phone: '1-415-2345678', gender: 'M', age: 25, birth: '1997-07-01'},
            {user: 'sm', name: 'Simon Minolta', phone: '1-123-7675682', gender: 'M', age: 20, birth: '1999-11-12'},
            {user: 'ra', name: 'Raymond Atom',  phone: '1-456-9981212', gender: 'M', age: 19, birth: '2000-06-11'},
            {user: 'ag', name: 'Mary George',   phone: '1-556-1245684', gender: 'F', age: 22, birth: '2002-08-01'},
            {user: 'kl', name: 'Kenny Linus',   phone: '1-891-2345685', gender: 'M', age: 29, birth: '1990-09-01'}
        ]
    }
}
```

### Work with redis for saving

You may capture the @delete and the @update event for saving purpose.

```html
<vue-excel-editor v-model="jsondata" @delete="onDelete" @update="onUpdate">
    <vue-excel-column field="user" label="User ID" type="string" width="80px" key-field />
    ...
</vue-excel-editor>
```

Specified "key-field" is necessary, it will reflect in rec.keys in the following:

```js
methods: {
    onDelete (records) {
      records = records.map(rec => ['del', rec.keys.join()])
      redis.multi(records).exec()
    },
    onUpdate (records) {
      records = records.map(rec => ['hset', rec.keys.join(), rec.name, rec.newVal])
      redis.multi(records).exec()
    }
}
```

### New row

Set the reference by ref="..."

```html
<vue-excel-editor ref="grid" v-model="jsondata">
    <vue-excel-column field="user" label="User ID" type="string" width="80px" key-field />
    ...
</vue-excel-editor>
```

```js
methods: {
    newRecord () {
        const rec = {
            user: 'nm',
            name: 'Norman Morris',
            phone: '1-222-3333333',
            gender: 'M',
            age: 28,
            birth: '1993-05-16'
        }
        // Call this to new record
        this.$refs.grid.newRecord(rec)
    }
}
```

After the record created, a set of @update events will be fired. If you undo a newRecord transaction, component will generate the corresponding @delete events. In case you do not care about the undo, you may skip this by appending the new record in v-model variable (jsondata array) directly.

### Delete row

```js
methods: {
    delRecord () {
        this.$refs.grid.deleteRecord(0) // delete the 1st record: Harry Cole
    }
}
```

The component will generate the corresponding @delete events. You may also interest in the deleteSelectedRecords() method.

### Remember the grid setting

The grid setting such as column width and column label can be saved in the localStorage of client browser by specified "remember" prop:

```html
<template>
    <vue-excel-editor v-model="jsondata" remember>
    ...
    </vue-excel-editor>
</template>
```

You may also capture the @setting event to handle more specifics.

### Change the column label

You may specify the column label in vue-excel-column label prop. However, it will persist after mounted. If you want to change the column label after mounted, you may try to update the variable fields. For example

```js
    this.$refs.grid.fields.forEach((field) => {
        if (field.name === 'col23') field.label = 'Product'
        if (field.label === '') field.label = '(' + field.name + ')'
    })
    this.$forceUpdate()  // remember to call vue update to reflesh the display
```

### Change the column invisibility

Same as column label, you may make the column visible/invisible in vue-excel-column label prop. However, it will persist after mounted. If you want to change it after mounted, you may try to update the variable fields. For example

```js
    this.$refs.grid.fields.forEach((field) => {
        if (field.name === 'col23') field.invisible = false
    })
    this.$forceUpdate()  // remember to call vue update to reflesh the display
```

### Export the content

The following provides the button to export the grid content.

```html
<template>
    <button @click="exportAsExcel"> Export Excel </button>
    <button @click="exportAsCsv"> Export CSV </button>
    <vue-excel-editor ref="grid" ...>
        ...
    </vue-excel-editor>
</template>
```

```js
methods: {
    exportAsExcel () {
        const format = 'xlsx'
        const exportSelectedOnly = true
        const filename = 'test'
        this.$refs.grid.exportTable(format, exportSelectedOnly, filename)
    }
    exportAsCsv () {
        const format = 'csv'
        const exportSelectedOnly = true
        const filename = 'test'
        this.$refs.grid.exportTable(format, exportSelectedOnly, filename)
    }
}
```

Note that only xlsx format supports compression.

### Do something when user select/unselect the rows

The selected or unselected rows will be passed to the provided trigger method

```html
<template>
    <vue-excel-editor v-model="jsondata" @select="onSelect">
    ...
    </vue-excel-editor>
</template>
```

```js
methods: {
    onSelect (selectedRows) {
      console.log(selectedRows)
    }
}
```

You may also want to watch the selected records count for displaying the action buttons. For example:

```html
<button v-show="showDeleteAction"> Delete </button>
<button v-show="showSendEmailInvitationAction"> Invite </button>
<button v-show="showSendBirthdayGreetingAction"> Greeting </button>
```

```js
computed: {
    showDeleteAction () {
        return this.$refs.grid.selectedCount > 0  // Show if any records selected
    },
    showSendEmailInvitationAction () {
        return this.$refs.grid.selectedCount === 1  // Show if single record is selected
    },
    showSendBirthdayGreetingAction () {
        // Show only if any selected people birthday matched today
        if (this.$refs.grid.selectedCount > 0) {
            return this.$refs.grid.getSelectedRecords().filter(item => item.birth === today).length > 0
        else
            return false
    }
}
```

### Do something when user change a cell content

You could achieve this by placing the method in change prop

```html
<vue-excel-column field="name" label="Name" type="string" width="150px" :change="onBeforeNameChange" />
<vue-excel-column field="phone" label="Contact" type="string" width="130px" :change="onBeforePhoneChange" />
<vue-excel-column field="birth" label="Date Of Birth" type="date" width="80px" :change="onBeforeBirthChange" />
```

```js
methods: {
    onBeforeNameChange (...args) {
        console.log(...args)  // show all the arguments: newVal, oldVal, oldRow, field
    },
    onBeforePhoneChange (newVal) {
        // This example demonstrate how to ensure the uniqueness of the phone number
        if (this.jsondata.findIndex(row => row.phone === newVal) >= 0)
            return false  // return false to reject the update
    },
    onBeforeBirthChange (newVal, oldVal, row) {
        row.age = moment().diff(newVal, 'years')  // calculate the age if birth is changed
    }
}
```

The change function can return a promise.

```html
<vue-excel-column field="phone" label="Contact" type="string" width="130px" :change="onBeforePhoneChange" />
```

```js
methods: {
    onBeforePhoneChange (newVal) {
        return new Promise((done) => {
            axios.post('checkPhoneNumber', {
                    phone: newVal
                })
                .then(done(true))
                .catch((e) => {
                    console.error(e)
                    done(false)
                })
        })
    }
}
```

However, the promise routine may cause your web page has low performance. I suggest you use a validation prop to show the wrong content in a grid with the validation error.

### Other Features

```html
<template>
    <vue-excel-editor v-model="jsondata" no-paging autocomplete filter-row>
        <vue-excel-column field="user"   label="User ID"       type="string" width="80px" key-field />
        <vue-excel-column field="name"   label="Name"          type="string" width="150px" />
        <vue-excel-column field="phone"  label="Contact"       type="string" width="130px" :validate="validPhoneNum" />
        <vue-excel-column field="gender" label="Gender"        type="select" width="50px"  :options="['F','M','U']" />
        <vue-excel-column field="age"    label="Age"           type="number" width="70px" />
        <vue-excel-column field="birth"  label="Date Of Birth" type="date"   width="80px" />
    </vue-excel-editor>
</template>
```

#### Filter + Footer Rows

Specified filter-row prop to show filter row

```html
<vue-excel-editor v-model="jsondata" filter-row>
```

If you don't want to show the footer, specified the no-footer prop

```html
<vue-excel-editor v-model="jsondata" no-footer filter-row>
```

![Filter + Footer Rows](https://i.imgur.com/7xmbrnM.png "Filter + Footer Rows")

#### Filtering

The filtering is one of the focusing features. It supports regular expression and windows wild card syntax.

![Filtering](https://i.imgur.com/spjZN3M.png "Filtering")

Component supports the prefx likes <, >, =, >=, <=, <>, ~ (regular expression) and wild-card * and ? symbol. Examples:
| Example           | Description |
| :---              | :---        |
| abc               | The values contain ABC |
| abc*              | The values start by ABC |
| *abc              | The values end by ABC |
| =abc              | The values equal to ABC |
| <>abc             | The values do not equal to ABC |
| >= 100            | The values are greater or equal to 100 |
| < 0               | The values are smaller than 0 |
| po-18*5??         | The values start from PO-18 and the 3rd-last char is 5 |
| =                 | The values are empty |
| ~.                | The values are not empty |
| ~.*tpx[ ]+ck      | The values have TPX and CK text and they have spaces in between |
| ~[ ]              | The values contain space |
| ~^so&#124;ary$    | The values start by SO or end by ARY |
| ~[ ]+$&#124;^[ ]+ | The values start or end by spaces |
| ~^[^ ]*$          | The values have no space |

Note that all filters are case-insensitive.

#### Sorting

![Sorting](https://i.imgur.com/vGZpHkv.png "Sorting")

It is possible to assign custom sorting function for specified column:

```html
<vue-excel-column field="birth" label="Date Of Birth" type="date" width="80px" :sort="sortingBirth" />
```

```js
const moment = require('moment')

methods: {
    sortingBirth (a, b) {
        return moment(a).diff(moment(b), 'days')
    }
}
```

#### Autocomplete

When user enters text in cell and holds a second, component will show 10 matched occurences for user to choose.
![Autocomplete](https://i.imgur.com/cUSUaUL.png "Autocomplete")

#### Options

```html
<vue-excel-column field="gender" label="Gender" type="select" width="50px" :options="['F','M','U']" />
```

Specified the type = "select" for Options column. This works like Autocomplete, but the list is provided and fixed.
![Options](https://i.imgur.com/LGefJif.png "Options")

#### Map

The "map" typed column is the same as "select" typed column, but the record value is not the same as the display text.
The options prop required to provide the mapping of the value and text.

```html
<vue-excel-column field="gender" label="Gender" type="map" width="50px" :options="{M:'Male','F':'Female','U':'Unknown'}" />
```

![Map](https://i.imgur.com/rEoglm5.png "Map")


#### Select

Click the row label to select the row. The component supports Excel-style which using Shift-click and Ctrl-click (Meta for OSX) combination to select multiple rows. You may also interested in the free-select prop to select the multiple rows without holding the shift key.

![Select](https://i.imgur.com/x0Lkwf8.png "Select")

#### Multi-Update

When the user updates any cell during select multiple rows, all cells of the same column of those selected rows will be updated.

![Multi-Update](https://i.imgur.com/iFSPxDQ.png "Multi-Update")

#### Sticky column

```html
<vue-excel-column field="user" label="User ID" type="string" width="80px" key-field sticky />
```

Specified "sticky" means the specified column is frozen when horizontal scrolling. Most likely sticky columns are leftmost.

#### Paging

```html
<vue-excel-editor v-model="jsondata" autocomplete filter-row>
...
</vue-excel-editor>
```

To gain better performance, I suggest you use paging by not specify "no-paging" prop. The component automatically calculates the page size once detecting the outer boundary resized. If you want to set the page size manually, try the prop "page". If more than 1 page is detected, the footer (horizontal scroll bar) will show the first/previous/next/last links for page navigation. You may customize these links by "localized-label" prop.

### Validation

The following is for column validation.

```html
<vue-excel-column field="phone" label="Contact" type="string" width="130px" :validate="validPhoneNum" />
```

```js
methods: {
    validPhoneNum (content, oldContent, record, field) {
        if (content === '') return 'Mandatory field'
        if (!/^[0-9]{1}-[0-9]{3}-[0-9]{7}$/.test(content)) return 'Invalid Phone Number'
        return '' // return empty string if there is no error
    }
}
```

![Validation](https://i.imgur.com/VV6RQYw.png "Validation")

The following is for row validation. It will be triggered for any changes. The error message will be shown at number column.

```html
<vue-excel-editor :validate="validWholeRecord">
```

```js
methods: {
    validWholeRecord (content, oldContent, record, field) {
        if (record.age !== moment().diff(record.birth, 'years')) return 'The age and birth do not match'
        return '' // return empty string if there is no error
    }
}
```

You may want to receive the validation error. Component will emit an event "validation-error" if row or field validation error changed.

```html
<vue-excel-editor @validate-error="logValidationError">
```

```js
methods: {
    logValidationError (error, row, field) {
        // For row validation, the field argument will be null value
        console.log(error, row, field)
    }
}
```

### Summary

```html
<vue-excel-column field="age" label="Age" type="number" width="70px" summary="sum" />
```

![Summary](https://i.imgur.com/tlZjilA.png "Summary")

Summary prop supports "sum", "min", "max", "avg" and "count".  
  
Note that "count" will instruct the component to count the cell which hold the following condition  
Number: >0  
String: non-empty  
Check: "Y", "1" or "T"  
DateTime: at or later than the current time  
  
Use this with care. The summary calculation eats resource, so it only calculates when the number of records changed (i.e. New, delete, filter). It does not recalculate if user changes the cell content. You may trigger the calculation manually by calling calSummary method in the @update event.

### Link

This is a nice feature in enterprise applications. Actually, I was learning from SAP UI. When the user holds the function key (Alt-key here) and move the mouse over the cell content, the text will show as a link. If user clicks on the link, your custom function will be triggered. The following example shows how to route to the user profile page by clicking on the name column cell.

```html
<vue-excel-column field="name" label="Name" type="string" width="150px" :link="routeToUserFunc" />
```

```js
methods: {
    // Hold Alt Key and click on any name, program will route to the page "User Profile"
    routeToUserFunc (content, record) {
        this.$router.push(`/user/${record.user}`)
    }
}
```

### Text/Value conversion

Sometimes displaying text and the store value will be different. In order to deal with this, you could use column properties to-text and to-value.

```html
<vue-excel-column field="phone" label="Contact" type="string" width="130px" :to-text="phoneToText" :to-value="phoneToVal" />
```

```js
methods: {
    phoneToText (val) {
        // convert number to hyphenated i.e. 14152345678 => 1-415-2345678
        return val.replace(/^(.)(...)(.*)$/, '$1-$2-$3')
    },
    phoneToVal (text) {
        // convert hyphenated text to number i.e. 1-415-2345678 => 14152345678
        return text.replace(/-/g, '')
    },
}
```

### Localization

The developer may override the default values through localized-label prop.

```html
<template>
    <vue-excel-editor v-model="jsondata" :localized-label="myLabels">
    ...
    </vue-excel-editor>
</template>
```

```js
data: {
    myLabels = {
        footerLeft: (top, bottom, total) => `Record ${top} to ${bottom} of ${total}`,
        first: 'First',
        previous: 'Previous',
        next: 'Next',
        last: 'Last',
        footerRight: {
            selected: 'Selected:',
            filtered: 'Filtered:',
            loaded: 'Loaded:'
        },
        processing: 'Processing',
        tableSetting: 'Table Setting',
        exportExcel: 'Export Excel',
        importExcel: 'Import Excel',
        back: 'Back',
        reset: 'Default',
        sortingAndFiltering: 'Sorting And Filtering',
        sortAscending: 'Sort Ascending',
        sortDescending: 'Sort Descending',
        near: '≒ Near',
        exactMatch: '= Exact Match',
        notMatch: '≠ Not Match',
        greaterThan: '&gt; Greater Than',
        greaterThanOrEqualTo: '≥ Greater Than or Equal To',
        lessThan: '&lt; Less Than',
        lessThanOrEqualTo: '≤ Less Than Or Equal To',
        regularExpression: '~ Regular Expression',
        customFilter: 'Custom Filter',
        listFirstNValuesOnly: n => `List first ${n} values only`,
        apply: 'Apply',
        noRecordIsRead: 'No record is read',
        readonlyColumnDetected: 'Readonly column detected',
        columnHasValidationError: (name, err) => `Column ${name} has validation error: ${err}`,
        noMatchedColumnName: 'No matched column name',
        invalidInputValue: 'Invalid input value',
        missingKeyColumn: 'Missing key column',
        noRecordIndicator: 'No record'
    }
}
```

This is for Chinese user

```js
data: {
    myLabels = {
        footerLeft: (top, bottom) => `纪录 ${top} 至 ${bottom}`,
        first: '头页',
        previous: '上一页',
        next: '下一页',
        last: '尾页',
        footerRight: {
          selected: '选择：',
          filtered: '过滤：',
          loaded: '载入：'
        },
        processing: '工作中',
        tableSetting: '表格设定',
        exportExcel: '汇出 Excel',
        importExcel: '汇入 Excel',
        back: '关',
        reset: '预设',
        sortingAndFiltering: '排序及过滤',
        sortAscending: '小至大排序',
        sortDescending: '大至小排序',
        near: '≒ 接近',
        exactMatch: '= 等于',
        notMatch: '≠ 不等于',
        greaterThan: '&gt; 大于',
        greaterThanOrEqualTo: '≥ 大于或等于',
        lessThan: '&lt; 少于',
        lessThanOrEqualTo: '≤ 少于或等于',
        regularExpression: '~ 正规表示式',
        customFilter: '过滤内容',
        listFirstNValuesOnly: n => `只列出 ${n} 项`,
        apply: '应用',
        noRecordIsRead: '没有纪录被读取',
        readonlyColumnDetected: '不可更新唯读纪录',
        columnHasValidationError: (name, err) => `纪录栏位 ${name} 发生核实错误: ${err}`,
        noMatchedColumnName: '没有能配对之栏位',
        invalidInputValue: '输入错误内容',
        missingKeyColumn: '找不到关键栏位',
        noRecordIndicator: '沒有纪录'
    }
}
```

## Compatibility

Chrome 79+, FireFox 71+, Safari 13+

## License

MIT

## Status

This project is in an early stage of development. Any contribution is welcome. :D
