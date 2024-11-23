def getPolishUsers(users: list) -> list:
  return [user for user in users if "country" in list(user.keys()) and user["country"] == "Poland"]


def elementSum(numbers: list[int]) -> list[int]:
  return sum(numbers[4:14])


def elementSum2(numbers: list[int]) -> list[int]:
  five_index = numbers.index(5)
  return sum(numbers[five_index:five_index + 10])


def powersOfTwo(n: int) -> list[int]:
  return [pow(2, i) for i in range(1, n + 1)]


if __name__ == "__main__":
  users = [
    {"name": "Kamil", "country":"Poland"},
    {"name":"John", "country": "USA"},
    {"name": "Yeti"}
  ]

  polish_users = getPolishUsers(users)
  print(polish_users)

  # I don't think the instruction is clear enough, should the ten elements start from the element "5" or from the fifth element in the list?

  numbers = [1,5,2,3,1,4,1,23,12,2,3,1,2,31,23,1,2,3,1,23,1,2,3,123]

  ten_elem_sum = elementSum(numbers)
  print(ten_elem_sum)

  ten_elem_sum = elementSum2(numbers)
  print(ten_elem_sum)

  powers_of_two = powersOfTwo(20)
  print(powers_of_two)