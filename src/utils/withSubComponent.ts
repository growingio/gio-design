function WithSubComponent<T, P>(OptComponent: T, dependencies: P) {
  const InternalComponent = OptComponent as typeof OptComponent & P;
  Object.assign(InternalComponent, dependencies);
  return InternalComponent;
}

export default WithSubComponent;
