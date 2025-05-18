class Fiber {
  constructor(
    tag,
    name
  ) {
    this.tag = tag;
    this.name = name
    this.child = null
    this.sibling = null
    this.return = null

    this.dependencies = null
    this.lanes = null
  }
}

const TAG = {
  FunctionComponent: 'FunctionComponent',
  ContextProvider: 'ContextProvider',
}