from random import choice, shuffle

''' Generate Stimuli Sequences

Letters : ['E','A','U','I','N','T','R','D']
Numbers : ['2','3','4','5','6','7','8','9']

Conditions: 

Congruent are combinations of
	2,4,6,8 & N, T, R, D
	        or
    3,5,7,9 & E, A, I, U

Incongruent are combinations of
	3,5,7,9 & N, T, R, D
	        or
    2,4,6,8 & E, A, I, U

    U2 D3 N2

Restrictions: 

1. Provide an equal amount of congruent & incongruent combinations
2. The same character may not appear on two successive trials
3. The same response (i.e., consonant, vowel, odd, or even) may not appear on more than 3 successive trials.

Stimuli komen in sets van 2 watbetreft fede cijfer of nummer focus.  houdt daar rekening mee!

'''
def genStims(n):
	stimSets = [[[],[]],[[],[]]]
	for i in range(4):
		while (len(stimSets[i % 2][(i/2) % 2]) * 4 < n):
			stimSets[i % 2][(i/2) % 2].append(new(i % 2, (i/2) % 2))
	sequence = stimSets[0][0] + stimSets[0][1] + stimSets[1][0] + stimSets[1][1]
	build(sequence, n)

def new(congruent, vowel):
	raw = [[[['N','T','R','D'],[3,5,7,9]],[['E','A','I','U'],[2,4,6,8]]],[[['N','T','R','D'],[2,4,6,8]],[['E','A','I','U'],[3,5,7,9]]]]
	return choice(raw[congruent][vowel][0]) + str(choice(raw[congruent][vowel][1]));

def build(s, n):
	shuffle(s)
	p = [s.pop()]
	for x in s:
		p.append(sim(x, p[-1]) if (x[0] in p[-1] or x[1] in p[-1]) else x)
		if len(p) > 3:
			if isStreak(p[-4:]):
				p = chomp(p)
				if len(p) > 4 and isStreak(p[-4:]):
					print 'ERROR 0', p[-4:]
				if len(p) > 5 and isStreak(p[-5:-1]):
					print 'ERROR 1', p[-5:-1]
				if len(p) > 6 and isStreak(p[-6:-2]):
					print 'ERROR 2', p[-6:-2]
				if len(p) > 7 and isStreak(p[-7:-3]):
					print 'ERROR 3', p[-7:-3]
	testSanity(p, n)

def chomp(p):
	bites = [[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3],[4],[1,4],[2,4],[3,4],[1,2,4],[2,3,4],[1,2,3,4]]
	for i in range(len(p)-3):
		if isStreak(p[len(p)-4-i:len(p)-i]):
			for bite in bites:
				for b in bite:
					p[-b] = ret(p,b)
				if not isStreak(p[len(p)-4-i:len(p)-i]):
					break
	return p

def isStreak(s):
	a = isTypeSet(s[0][0],s[1][0])
	b = isTypeSet(s[2][0],s[3][0])
	c = isTypeSet(s[0][1],s[1][1])
	d = isTypeSet(s[2][1],s[3][1])
	if (a % 2 and a == b) or (a % 2 and a == d) or (c % 2 and c == b) or (c % 2 and c == d):
		return 1
	# elif isLeft(s[0][0]) == isLeft(s[1][1]) == isLeft(s[2][1]) == isLeft(s[3][0]):
		# print s
		# return 2
	# elif  (isLeft(s[0][1]) == isLeft(s[1][0]) == isLeft(s[2][0]) == isLeft(s[3][1])):
		# print s
		# return 3
	return 0

def isTypeSet(a,b):
	return [[3,2],[0,1]][isLeft(a)][isLeft(b)]

def isLeft(s):
	return (1 if s in 'NTRD2468' else 0)

def sim(s, p, r='Q0'):
	x, y, = s[0], s[1]
	while x == p[0] or x == r[0]:
		x = choice([['N','T','R','D'],['E','A','I','U']][isVowel(s[0])])
	while y == p[1] or x == r[1]:
		y = choice([['3','5','7','9'],['2','4','6','8']][isOdd(s[1])])
	return x + y

def ret(p,n):
	try:
		x = sim(flip(p[-n]),p[-1-n],p[-n+1])
	except IndexError:
		x = sim(flip(p[-n]),p[-1-n])
	return x

def flip(s):
	return new(int(isVowel(s[0])==isOdd(s[1])),int(isVowel(s[0])==0))
	
def isVowel(s):
	return (1 if s in "AEIU" else 0)

def isOdd(s):
	return (1 if s in "3579" else 0)

def testSanity(p, n):
	sanity = True
	if len(p) != n:
		sanity = False 
		print 'ERROR TYPE 0: Missing Values', len(p), 'out of', str(n)
	for i in range(1, len(p)):
		if (p[i][0] in p[i-1] or p[i][1] in p[i-1]):
			sanity = False 
			print 'ERROR TYPE 2:', p[i], '-->', p[i-1], 'at', str(i)
	for i  in range(3, len(p)) :
		if isStreak(p[i-3:i+1]):
			sanity = False 
			print 'ERROR TYPE 3:', p[i-4], p[i-3], p[i-2], p[i-1], p[i], 'RESPONSE STREAK', 'type', str(isStreak(p[i-3:i+1])), 'at', str(i)
	if sanity:	
		print p
	# else:
		# genStims(464)

if __name__ == '__main__':
	genStims(464)
