// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import ResizeObserverPolyfill from "resize-observer-polyfill";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])
      || /invalid json response body/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

const setupMatchMedia = () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => {
      const maxWidth = parseInt(
        /max-width:(?<maxWidth>\d+)px/.exec(query)?.groups?.maxWidth
      );
      const minWidth = parseInt(
        /min-width:(?<minWidth>\d+)px/.exec(query)?.groups?.minWidth
      );

      let matches =
        (minWidth ? minWidth <= window.innerWidth : true) &&
        (maxWidth ? window.innerWidth <= maxWidth : true);

      if (query === "(orientation: landscape)") {
        matches = window.innerWidth > window.innerHeight;
      }

      return {
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    }),
  });
};

beforeEach(() => {
  setupMatchMedia();
  window.ResizeObserver = ResizeObserverPolyfill;
});

afterAll(() => {
  console.error = originalError;
});
