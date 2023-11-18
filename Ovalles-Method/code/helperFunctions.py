def shunting_yard(exp):
    """
    Esta función toma la expresión regular y retorna la expresión postfix \n
    :param exp: La expresión regular aumentada
    :return: La expresión regular aumentada en postfix invertida
    """
    # Todos los operadores incluidos en el diseño del autómata deben ser incluidos en este diccionario de precedencia.
    precedence = {'(': 0, '|': 1, '.': 2, '*': 3, '+': 3, '?': 3, ')': 4}
    exp = exp.replace(' ', '')

    stack = []
    output = []

    for char in exp:
        if char in ['|', '.', '+', '?', '*', '(', ')']: # Arreglo con los operadores
            if char == '(':
                stack.append(char)
            elif char == ')':
                while stack[-1] != '(':
                    output.append(stack.pop())
                stack.pop()
            else:
                if len(stack) != 0 and precedence[stack[-1]] >= precedence[char]:
                    output.append(stack.pop())
                stack.append(char)
        else:
            output.append(char)

    while len(stack) > 0:
        output.append(stack.pop())

    return list(reversed(output))
