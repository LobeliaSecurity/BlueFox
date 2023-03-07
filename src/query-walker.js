// © LobeliaSecurity™
// https://github.com/LobeliaSecurity

export default class {
  constructor(oDict, rootElement) {
    this.oDict = oDict;
    this.rootElement = rootElement;
  }

  async do(selectorTarget) {
    if (!selectorTarget) {
      selectorTarget = this.rootElement;
    }
    for (let selector in this.oDict) {
      let elements = selectorTarget.querySelectorAll(selector);
      for (let e of elements) {
        try {
          await this.oDict[selector](e);
        } catch (ex) {
          console.info("QueryWalker |", ex);
        }
      }
    }
  }
}
