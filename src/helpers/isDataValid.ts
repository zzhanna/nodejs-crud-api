export const isBodyDataValid = (
  username: string,
  age: number,
  hobbies: string[],
) => {
  if (
    typeof username === "string" &&
    typeof age === "number" &&
    age > 0 &&
    Array.isArray(hobbies) &&
    hobbies.every((el) => typeof el === "string")
  ) {
    return true;
  } else {
    return false;
  }
};
