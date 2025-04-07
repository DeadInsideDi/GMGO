import time
# import numpy as np

# def getPrimesFromRangesGood(a: int, b: int):
#   nums = np.ones(b+1, dtype=bool)
#   nums[0] = nums[1] = False
  
#   for i in range(2, int(np.sqrt(b)) + 1):
#     if nums[i]: nums[i*i::i] = False
#   primes = np.nonzero(nums)[0]
#   return primes[np.searchsorted(primes, a):]


# # # t = time.time()
# # # getPrimesFromRanges(2,1_000_000) # 4.188979387283325
# # # print(time.time()-t)


# t = time.time()
# print(
#   getPrimesFromRangesGood(999999,1_000_000_000) # 10.4170126438140
# )
# print(time.time()-t)  



# mod_floor = (a,n) => (a % n + n) % n;

def mod_floor(a, n):
  m = a % n
  return m + n if m < 0 else m

# const mod = (a, b) => a - b * Math.floor(a/b)
def mod(a, b):
  return a - b * (a // b)


print(sum([23.467689,23.297543,26.57866048])/3)
t = time.time()
for j, i in enumerate(range(100_000_000),2*3*5*7): mod_floor(i,j)
print(time.time()-t)

t = time.time()
for j, i in enumerate(range(100_000_000),2*3*5*7): mod_floor(i,j)
print(time.time()-t)

# print(sum([23.660733,25.492143630981445,25.3900575])/3)