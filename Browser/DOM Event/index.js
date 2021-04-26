// 事件代理

function delegate(element, eventType, selector, fn) {
  element.addEventListener(
    eventType,
    (e) => {
      let eventOnTarget = e.target;

      while (!eventOnTarget.matches(selector)) {
        if (element === eventOnTarget) {
          eventOnTarget = null;
          break;
        }

        eventOnTarget = eventOnTarget.parentNode;
      }

      eventOnTarget && fn.call(eventOnTarget, e, eventOnTarget);
    },
    true
  );
}
