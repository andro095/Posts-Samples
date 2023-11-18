class Node(object):
    """
    Node class for syntactic tree
    """

    def __init__(self, value):
        self.father = None  # father node
        self.value = value  # value of node
        self.left = None  # left child node
        self.right = None  # right child node

        self.label = None  # value of enumeration
        self.nullable = None  # nullability of node

        self.first_position = set()  # first position of node
        self.last_position = set()  # last position of node

        # max number of children
        self.max_child_len = 2 if (
                self.value == '|' or self.value == '.') else 1 if self.value in ['|', '.', '+', '?', '*'] else 0

    def __len__(self):
        return 2 if self.left is not None and self.right is not None else 1 if self.left is not None or self.right is not None else 0

    def __str__(self):
        return self.value 
