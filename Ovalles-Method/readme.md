Suppose you are taking a course on compilers or finite automata and you have to construct a syntax tree for a given regular expression. You know how to do it manually, but you struggle to find a simple and efficient way to do it programmatically. You search online for solutions, but most of them involve complicated rules and conditions. You are about to give up when you stumble upon this blog post that offers a novel method for building syntax trees.


![Figure 1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s63qpprrgnez43h2ssgi.gif)
<figcaption>You trying to solve how can be finite state machines created. Source: <a href="https://medium.com/r/?url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FTesavnYFHngXAmlQgm%2Fgiphy.gif">Giphy<a/></figcaption>

### Introduction

This method, which I call André’s Method (after myself 😂), is based on an adaptation and extension of another method that works well for mathematical expressions, but not for regular expressions. The goal of this method is to take any regular expression and generate the correct syntax tree that can be used to create finite automata, either deterministic or non-deterministic. The method consists of two main steps:

1. Shunting Yard Algorithm
2. Postfix expression backtracking

Before explaining each step in detail, I will first state the assumptions and requirements that the method relies on. The following rules must be followed: 

- The regular expression must be well-formed: This means that the parentheses must be balanced and the operators must be placed correctly. Otherwise, the method may produce incorrect trees. 


- The regular expression must indicate concatenation explicitly: This means that a special symbol (such as ‘.’) must be used to mark where concatenation occurs in the expression. To illustrate the method, we will use the dot “.” as the symbol for concatenation. For example, the regular expression a(ba)abb would be rewritten as a.(b.a).a.b.b with the dot symbol.

- Define the precedence or hierarchy of the operators that will be used in the syntax tree. The precedence determines which operations are performed first in the expression. For this example, we will use a modified version of the usual precedence rules. Next, we will explain each step of the method in more detail. 

![No te preocupes por lo que veras.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a52ik8pl7gjv5bbrkexm.gif)
<figcaption>Do not enter in panic. Source: <a href="https://medium.com/r/?url=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FaEvau1NKXfQLn2WD6E%2Fgiphy.gif">Giphy<a/></figcaption>

### Shunting Yard Algorithm

The Shunting Yard Algorithm is an algorithm that converts an expression with operators and operands from infix notation to postfix notation. The algorithm uses two queues: one is called the stack queue, which stores the operators according to their precedence and follows the LIFO (Last In First Out) principle. The other queue is called the output or postfix queue, which stores the resulting expression in postfix notation.

The Shunting Yard Algorithm requires a modified version of the operator precedence to work properly. We will describe how to set up the input and output parameters and steps of this algorithm, as well as the importance of operator precedence.

Input: Regular expression in infix
Output: Regular expression in postfix

1. Declare the stack queue for operators
2. Declare the output queue for postfix expression
3. Define the operator precedence by removing the closing parenthesis from the precedence and moving the opening parenthesis to have the lowest precedence.
4. For each character in the expression:
  - If the character is an operand (not an operator or a parenthesis):
      1. Enqueue the character to the output queue.
  - If the character is an operator or a parenthesis:
      - If the character is an opening parenthesis:
          1. Push the parenthesis to the stack queue.
      - If the character is an operator:
          1. Check the precedence of the operator that is at the top of the stack queue:
          2. If the stack queue is empty or the precedence of the operator at the top is lower than that of the character:
              1. Push the operator to the stack queue.
          3. If the precedence of the operator at the top is higher than or equal to that of the character:
              1. Pop the operator from the stack queue and enqueue it to the output queue.
              2. Push the character to the stack queue
      - If the character is a closing parenthesis:
          1. Pop all the operators from the stack queue and enqueue them to the output queue until an opening parenthesis is found at the top of the stack queue. Pop the opening parenthesis from the stack queue, but do not enqueue it to the output queue.
5. If the stack queue is not empty:
  1. Pop all the operators from the stack queue and enqueue them to the output queue.
6. Return the regular expression in postfix. 

The operator precedence follows a standard hierarchy for regular expressions, so depending on the operators that are used, the precedence table would look something like this:

<table>
<thead>
  <tr>
    <th>Precedence</th>
    <th># Operator<br>Children</th>
    <th>Operators</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>4</td>
    <td>N.A</td>
    <td>(</td>
  </tr>
  <tr>
    <td>3</td>
    <td>1</td>
    <td>* + ?</td>
  </tr>
  <tr>
    <td>2</td>
    <td>2</td>
    <td>.</td>
  </tr>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>|</td>
  </tr>
  <tr>
    <td>0</td>
    <td>N.A</td>
    <td>)</td>
  </tr>
</tbody>
</table>

![Cuando te das cuenta que solo vas a la mitad](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p6pg8psmjkbib7wostkq.gif)
<figcaption>POV: you realized that this is just the half of the process. Source: <a href="https://tenor.com/qqf3brdMl4T.gif">Tenor<a/></figcaption>

### Postfix expression backtracking
After converting the regular expression to postfix notation using the Shunting Yard Algorithm, we need to backtrack the postfix expression to build the syntax tree. The backtracking algorithm is the unique part of this method that I have developed. I have not found any other source that uses this algorithm to construct syntax trees for regular expressions. If you know of any prior publication that describes the same algorithm, please let me know and I will give proper credit. Now, let’s see how the algorithm works. 

The backtracking algorithm reads the postfix expression from right to left and fills the syntax tree in a reverse postorder fashion. This means that it fills the right node first, then the left node, and then the parent node. Whenever it creates a new leaf node, it checks if the maximum number of children matches the number of children that it has. The number of children is basically the number of operands that an operator can take. For “|” and “.” (concatenation) operators, the number of children is two, while for the rest of the operators it is one. The operands have zero children, which makes them leaves.

Now that we have explained the algorithm, we can specify the input and output parameters and the formal steps of the method.  

Input: Regular expression in postfix
Output: Syntax tree for regular expression

Algorithm:

1. Reverse the input regular expression.
2. Create the root node with the first character of the reversed expression.
3. Set the focus node to the root node.
4. For each character of the reversed expression (excluding the first character):
    1. Create a new node with the character.
    2. If the focus node can have two children:
        - If the focus node has no right child:
            1. Insert the new node as the right child of the focus node.
            2. Set the focus node to the new node.
        - Otherwise:
            1. Insert the new node as the left child of the focus node.
            2. Set the focus node to the new node.
    3. If the focus node can have one child:
        1. Insert the new node as the left child of the focus node.
        2. Set the focus node to the new node.
    4. While the focus node is not the root node and the focus node has all its possible children:
        1. Set the focus node to its parent node
5. Return the syntax tree that was created

This way, we have our beautiful syntax tree that will not lower our grade in our compiler project. Unless, of course, one of the 100 expressions that we tested in our compiler during our presentation failed and that’s why we went from having a 90 to a 50 :D.

![6am](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a8uj6jmn0s3opmizmcf8.gif)
<figcaption>You finishing the project with 20 liters inside your body. Source: <a href="https://makeagif.com/i/ygJAJV ">Make a Gif<a/></figcaption>

### Code 

You can find samples of code written in Python [here](https://github.com/andro095/Posts-Samples/tree/master/Ovalles-Method). Please remember to cite me if you are going to use my code so that you don’t get accused of plagiarism 👀.

### Bibliography
Dr Dijkstra .E.W, Original description of the Shunting yard algorithm. Retrieved from: [https://www.cs.utexas.edu/~EWD/MCReps/MR35.PDF](https://www.cs.utexas.edu/~EWD/MCReps/MR35.PDF)

