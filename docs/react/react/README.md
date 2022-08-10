# React

## 定义
用于构建用户界面的Javascript框架

## hooks
- useState: 给函数添加状态,接受一个初始化值/一个初始化函数
```js
function Counter(props) {
  const [count, setCount] = useState(0)
  return (
    <div>
      {count}
    </div>
  )
}
```
- useReducer: 给函数添加状态,属于```useState```的强化版本,并且给状态增加相关逻辑行为
```js
const initCount = (init) => ({
  count: init
})
const reducer = (state, action) => {
  switch (action.type) {
    case increment:
      return {count: state.count + 1}
    case decrement:
      return {count: state.count - 1}
    case rest:
      return initCount(action.payload)
    default:
      throw new Error
      break;
  }
}
function Counter(props) {
  const [state, dispatch] = useReducer(reducer, 0, initCount)
  return (
    <div>
      {state.count}
    </div>
  )
}
```
- useEffect: 给函数组件增加生命周期，render之后会被调用，以及卸载前调用，可接受一个函数和监控的状态
```js
function Counter(props) {
  const [count, setCount] = useState(() => {
    return props.count
  })
  // 在ComponentDidMount、 ComponentDidUpdate、 ComponentWillUnmount异步调用
  useEffect(() => {"doSomething"})
  // 在ComponentDidMount、在count改变的时候、 ComponentWillUnmount异步调用
  useEffect(()=> {"doSomething"}, [count])
  // 在ComponentDidMount、在ComponentWillUnmount异步调用
  useEffect(() => {"doSomething"}, [])
  // 清除effect函数, 在第二次render函数调用之后，先执行cleanEffect，再重新执行effectFn
  const cleanEffect = () => {"doSomething"}
  const effectFn = () => {"doSomething", return cleanEffect}
  useEffect(effectFn)
}
```



- useContext: 函数组件可以获取上下文状态, ,接受```React.createContext()```返回的对象
```js
const Context = React.createContext({count: 0})
function App() {
  return (
    <Context.provider>
      <Counter>
    </Context.provider>
  )
}
function Counter(props) {
  const context = useContext(Context)
  return (
    <div>
      {context.count}
    </div>
  )
}
```

