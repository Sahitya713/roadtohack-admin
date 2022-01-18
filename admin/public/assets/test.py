
def multiply(a, b):
    return a*b

def multiply2(a):
    def multiply(b):
        return a*b
    return multiply


x = multiply(3,5)

y = multiply2(3)(5)
multiplyBy3 = multiply2(3)

print(multiplyBy3(9))

print(x)
print(y)

print("hello")