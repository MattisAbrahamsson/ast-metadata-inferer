import Nightmare from 'nightmare';
import browserCompatData from 'mdn-browser-compat-data';

const nightmare = Nightmare({
  show: true
})

console.log(browserCompatData.api)

// function formatJSAssertion(record) {
//   const remainingProtoObject = record.protoChain.filter((e, i) => i > 0);
//   const formattedStaticProtoChain = record.protoChain.join('.');
//   const lowercaseParentObject = record.protoChain[0].toLowerCase();

//   const exceptions = new Set(['crypto', 'Crypto']);

//   const lowercaseTestCondition = String(
//     lowercaseParentObject !== 'function' &&
//     !exceptions.has(record.protoChain[0])
//   );

//   const lowercaseSupportTest = `
//     if (${lowercaseTestCondition}) {
//       ${lowercaseParentObject === 'function' ||
//       lowercaseParentObject === record.protoChain[0]
//         ? ''
//         : `if (typeof ${lowercaseParentObject} !== 'undefined') {
//           throw new Error('${record.protoChain[0]} is not supported but ${lowercaseParentObject} is supported')
//         }`}
//     }
//   `;

//   return `
//     (function () {
//       ${lowercaseSupportTest}
//       try {
//         // a
//         if (typeof window === 'undefined') { return false }
//         // a
//         if (typeof ${record.protoChain[0]} === 'undefined') { return false }
//         // a.b
//         if (typeof ${formattedStaticProtoChain} !== 'undefined')  { return true }
//         // a.prototype.b
//         if (typeof ${record.protoChain[0]}.prototype !== 'undefined') {
//           if (${remainingProtoObject.length} === 0) { return false }
//           return typeof ${[record.protoChain[0], 'prototype'].concat(remainingProtoObject).join('.')} !== 'undefined'
//         }
//         return false
//       } catch (e) {
//         // TypeError thrown on property access and all prototypes are defined,
//         // item usually experiences getter error
//         // Ex. HTMLInputElement.prototype.indeterminate
//         // -> 'The HTMLInputElement.indeterminate getter can only be used on instances of HTMLInputElement'
//         return (e instanceof TypeError)
//       }
//     })()
//   `;
// }

// /**
//  * Takes a `protoChain` and returns bool if supported. Should only be run if
//  * supported. Evaluation returns true if defined
//  *
//  * ex. ['Array', 'push'] => false
//  * ex. ['document', 'querySelector'] => true
//  */
// export function determineIsStatic(record) {
//   return `
//     (function () {
//       try {
//         var protoChainIdType = typeof ${record.protoChain.join('.')}
//         return protoChainIdType !== 'undefined'
//       } catch (e) {
//         return e instanceof TypeError
//       }
//     })()
//   `;
// }

// /**
//  * Create assertion to check if a CSS property is supported
//  * @TODO: Support checking if API is 'prefixed'
//  */
// function formatCSSAssertion(record) {
//   const cssPropertyName = record.protoChain[record.protoChain.length - 1];
//   return `
//     (function () {
//       // Check CSS properties
//       var properties = document.body.style
//       if ('${cssPropertyName}' in properties) return true
//       // Check CSS values
//       var values = document.createElement('div').style;
//       if ('${cssPropertyName}' in values) return true
//       return false
//     })()
//   `;
// }

// export function determineASTNodeType(record) {
//   const api = record.protoChain.join('.');
//   const { length } = record.protoChain;

//   return `
//     (function() {
//       var items = []
//       if (${length} === 1 && typeof ${api} === 'function') {
//         try {
//           ${api}()
//           items.push('CallExpression')
//         } catch (e) {
//           if (!e.message.includes("Please use the 'new' operator")) {
//             items.push('CallExpression')
//           }
//         }
//         try {
//           new ${api}
//           items.push('NewExpression')
//         } catch (e) {
//           if (!e.message.includes('not a constructor')) {
//             items.push('NewExpression')
//           }
//         }
//       }
//       else {
//         items.push('MemberExpression')
//       }
//       return items
//     })()
//   `;
// }

// /**
//  * Get all the supported css values. Evaluation will return an array of camel-cased
//  * values.
//  */
// export function getAllSupportCSSValues() {
//   return `
//     (function () {
//       var styles = document.createElement('div').style;
//       var stylesList = []
//       for (var style in styles) {
//         stylesList.push(style)
//       }
//       return stylesList
//     })()
//   `;
// }

// /**
//  * Get all the supported css properties. Evaluation will return an array of
//  * camel-cased properties.
//  */
// export function getAllSupportCSSProperties() {
//   return `
//     (function () {
//       var properties = document.body.style
//       var stylesList = []
//       for (var property in properties) {
//         stylesList.push(property)
//       }
//       return stylesList
//     })()
//   `;
// }

// /**
//  * Create a list of browser API assertions to check if an API is supported
//  */
// export default function AssertionFormatter(record) {
//   switch (record.type) {
//     case 'css-api':
//       return {
//         apiIsSupported: formatCSSAssertion(record),
//         allCSSValues: getAllSupportCSSValues(record),
//         allCSSProperties: getAllSupportCSSProperties(record)
//       };
//     case 'js-api':
//       return {
//         apiIsSupported: formatJSAssertion(record),
//         determineASTNodeType: determineASTNodeType(record),
//         determineIsStatic: determineIsStatic(record)
//       };
//     default:
//       throw new Error(`Invalid API type: "${record.type}"`);
//   }
// }

// nightmare
//   .goto('https://google.com')
//   .evaluate(() => document.querySelector('#').href)
//   .end()
//   .then(console.log)
//   .catch(console.log)
