## High Order Component
- HOC is just a function which receive an Component as parameter and return an new one.
```javascript
function visible(WrappedComponent) {
  return class parent extends React.Component {
    render() {
      const {visible, ...props} = this.props;

      if (visible === false) return null;

      return <WrappedComponent {...props}/>
    }
  }
}
```

### Props Proxy
- Return an new component which compose the WrappedComponent we passed into. It turns we create the parent component of WrappedComponent after return.

### Revert Inheritance 
- Return an new component which extends passed WrappedComponent.

```javascript
function inheritHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      return super.render();
    }
  }
}
```

### Usage
- Composition Render
- Condition Render
- Manipulate Props
- Get Refs
- State Component
- Hijack Render

### Reference
- [React高阶组件(HOC)的入门📖及实践💻](https://juejin.cn/post/6844904050236850184)
- [Mixin, HOC, Hooks](https://juejin.cn/post/6844903815762673671#heading-4)