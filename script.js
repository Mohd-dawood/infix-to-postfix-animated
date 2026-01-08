function precedence(op) {
  if (op === '+' || op === '-') return 1;
  if (op === '*' || op === '/') return 2;
  if (op === '^') return 3;
  return 0;
}

function convert() {
  let infix = document.getElementById("infix").value;
  let stack = [];
  let postfix = "";

  for (let ch of infix) {
    if (/[a-zA-Z0-9]/.test(ch)) {
      postfix += ch;
    } 
    else if (ch === '(') {
      stack.push(ch);
    } 
    else if (ch === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        postfix += stack.pop();
      }
      stack.pop();
    } 
    else {
      while (
        stack.length &&
        precedence(ch) <= precedence(stack[stack.length - 1])
      ) {
        postfix += stack.pop();
      }
      stack.push(ch);
    }
  }

  while (stack.length) {
    postfix += stack.pop();
  }

  let output = document.getElementById("postfix");
  output.classList.remove("show");
  output.innerText = postfix || "---";

  setTimeout(() => {
    output.classList.add("show");
  }, 50);
}
