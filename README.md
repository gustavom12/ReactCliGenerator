# React generator Cli
React generator of Components, styles and custom hooks

## Install
* Run 
`npm i -g https://github.com/gustavom12/ReactCliGenerator.git`  

## Generate Component
* Run
`react-cli c <src/NameOfComponent> [extension]`

### Options
* Skip styles file
--skip-styles

### Example
`react-cli c components/Header .tsx`

### Example output
```javascript
import React,{} from 'react';
import './Header.sass'
const Header = ()=>{
  return(
    <div className="Header">
    </div>
  )
}
export default Header
```

## Generate custom Hooks
* Run
`react-cli c <src/NameOfCustomHook> [extension]`

### Example
`react-cli h hooks/useCustomHook .ts`

### Example output
```javascript
import { useEffect, useState } from 'react';
const useName = ()=>{
}
export default useName
```