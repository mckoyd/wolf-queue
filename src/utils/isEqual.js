const checkObjectEquality = (o1, o2) => {
  let prop;
  for (prop in o1) {
    if (o1.hasOwnProperty(prop) !== o2.hasOwnProperty(prop)) return false;
    if (typeof o1[prop] !== typeof o2[prop]) return false;
    switch (typeof o1[prop]) {
      case "object":
        if (!checkObjectEquality(o1[prop], o2[prop])) return false;
        break;
      case "function":
        if (o1[prop].toString() !== o2[prop].toString()) return false;
        break;
      default:
        if (o1[prop] !== o2[prop]) return false;
    }
  }

  for (prop in o2) {
    if (!o1[prop]) return false;
  }

  return true;
};

const isEqual = (a, b) => {
  if (typeof a !== typeof b) return false;
  const aIsPrimitive = typeof a !== "object" && typeof a !== "function";
  const bIsPrimitive = typeof b !== "object" && typeof b !== "function";
  if (aIsPrimitive && bIsPrimitive) return a === b;
  if (typeof a === "function" && typeof b === "function")
    return a.toString() === b.toString();
  return checkObjectEquality(a, b);
};

module.exports = isEqual;
