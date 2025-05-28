let navigator: (path: string) => void = () => {};

export function setNavigator(n: (path: string) => void) {
  navigator = n;
}

export function navigateTo(path: string) {
  navigator(path);
}
