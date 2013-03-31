from random import choice, shuffle

""" Generate Stimuli Sequences

Run with:

	python genCombinations.py

Generate a sequence of stimuli to be used in a task switching study. The stimuli
consist of two characters which each may be subjected to their respective
classification challanges. In this case the challanges are to determine whether
the 1st character is a capitalised or not, and whether the 2nd character is 
smaller or greater than 5.

The following characters are used:

Letters : ['e','d','h','t','R','B','A','F']
Numbers : ['1','2','3','4','6','7','8','9']

As '>5' and 'captialized' as well as '<5' and 'non-capitalized' are mapped to 
the same response key, there are certain stimuli combinations which are 
congurent, that is to say where both characters have the same correct response,
and incongruent stimuli, where the correct response for the characters is 
different.

Congruent are combinations of
	
   e, d, h, t  &  1, 2, 3, 4
	           or
   R, B, A, F  &  6, 7, 8, 9

Incongruent are combinations of

   e, d, h, t  &  6, 7, 8, 9
	           or
   R, B, A, F  &  1, 2, 3, 4

In order to fulfil study requirements, the following restrictions are places 
upon the generation of stimuli:

1. Provide an equal amount of congruent & incongruent combinations
2. The same character may not appear on two successive trials
3. The same response (i.e., capitalized, non-capitalized, <5, or >5) may not 
   appear on more than 4 successive trials.

"""

CAP = ['R','B','A','F']
NCP = ['e','d','h','t']
LT5 = ['1','2','3','4']
GT5 = ['6','7','8','9']

def genStims(n):
	""" Generate an equal number of congruent and incongruent stimuli."""
	stimSets = [[[],[]],[[],[]]]
	for i in range(4):
		while (len(stimSets[i % 2][(i/2) % 2]) * 4 < n):
			stimSets[i % 2][(i/2) % 2].append(newStim(i % 2, (i/2) % 2))
	sequence = stimSets[0][0] + stimSets[0][1] + stimSets[1][0] + stimSets[1][1]
	shuffleSeq(sequence, n)

def newStim(congruent, capitalized):
	""" Return a random stimuli abiding by the type constraints."""
	raw = [[[NCP,GT5],CAP,LT5]], [[NCP,LT5],[CAP,GT5]]]
	return choice(raw[congruent][capitalized][0]) + \
		   str(choice(raw[congruent][capitalized][1]));

def shuffleSeq(s, n):
	""" Randomise a given sequence of character pairs in which no character
	pair repeats a character from the previous pair, and in which no sequence
	of character pairs results in warranting the same response to the 
	classification challange. 

	In other words, no four stimuli should contain challanges for which 
		
		'>5' and 'captialized' 
				  or 
		'<5' and 'non-capitalized' 

	are the appropriate responses.
	
	"""
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

def isStreak(s):
	""" Test whether the 4 provided stimuli form a streak of the same response"""
	a = isTypeSet(s[0][0],s[1][0])
	b = isTypeSet(s[2][0],s[3][0])
	c = isTypeSet(s[0][1],s[1][1])
	d = isTypeSet(s[2][1],s[3][1])
	if (a % 2 and a == b) or (a % 2 and a == d) or \
	   (c % 2 and c == b) or (c % 2 and c == d):
		return 1
	# elif isLeft(s[0][0]) == isLeft(s[1][1]) == isLeft(s[2][1]) == isLeft(s[3][0]):
		# print s
		# return 2
	# elif  (isLeft(s[0][1]) == isLeft(s[1][0]) == isLeft(s[2][0]) == isLeft(s[3][1])):
		# print s
		# return 3
	return 0

def isTypeSet(a,b):
	""" Return the typeset number of the stimuli"""
	return [[3,2],[0,1]][isLeft(a)][isLeft(b)]

def isLeft(s):
	""" Return 1 if 'left' is the correct response for the stimuli"""
	return (1 if s in NCP + LT5 else 0)

def sim(s, p, r='Q0'):
	"""Two subsequent stimuli have characters in common. Generate and return a 
	stimuli for which this is not the case.

	"""
	x, y = s[0], s[1]
	while x == p[0] or x == r[0]:
		x = choice([NCP,CAP][isCaps(s[0])])
	while y == p[1] or x == r[1]:
		y = choice([GT5,LT5][isGT5(s[1])])
	return x + y

def flip(s):
	""" Change stimuli into a combination that abides by the type constrains, but
	does not require the same response, thereby upholding the first constraint, 
	without sacrificing the third."""
	return newStim(int(isCaps(s[0])==isGT5(s[1])),int(isCaps(s[0])==0))
	
def isCaps(s):
	""" Return 1 if character is capitalized"""
	return (1 if s in "RBAF" else 0)

def isGT5(s):
	""" Return 1 if character is greater than five"""
	return (1 if s in "6789" else 0)

def testSanity(p, n):
	""" Testing that both implicit and the three explicit constraints are upheld
	
	Test 0: Are sufficient stimuli generated? 
	Test 1: Are there an equal number of congruent and incongruent stimuli?
	Test 2: Does no stimuli contain a character present in the previous stimuli?
	Test 3: Does no sequence of 4 stimuli result in the same challange response?
	
	"""
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
			print 'ERROR TYPE 3:', p[i-4], p[i-3], p[i-2], p[i-1], p[i], \
			  'RESPONSE STREAK', 'type', str(isStreak(p[i-3:i+1])), 'at', str(i)
	if sanity:	
		print p
	# else:
		# genStims(464)

if __name__ == '__main__':
	genStims(464)
