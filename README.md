# Excel Editor for VUE 2

Vue2 plugin for displaying and editing the array-of-object in Excel style 

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

| Name             | Type  | Description |
| :---             | :---: | ---         | 
| v-model  | Array Of Objects  | Data to be edited | 
| n-fields  | Number  | Number of fields in table | 

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

In your HTML call it like

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
REQUIRED
- json_data: Contains the data you want to display and edit,

## License
MIT

#### Status
This project is in an early stage of development. Any contribution is welcome :D
