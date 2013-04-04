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
   appear on more than 3 successive trials.

"""

CAP,NCP,LT5,GT5 = ['R','B','A','F'],['e','d','h','t'],['1','2','3','4'],['6','7','8','9']

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
	options = [[[NCP,GT5],[CAP,LT5]], [[NCP,LT5],[CAP,GT5]]]
	return choice(options[congruent][capitalized][0]) + \
		   choice(options[congruent][capitalized][1]);

def shuffleSeq(seq, n):
	""" Randomise a given sequence of character pairs in which no character
	pair repeats a character from the previous pair, and in which no sequence
	of 4 character pairs results in warranting the same response to the 
	classification challange. 

	In other words, no four stimuli should contain challanges for which 
		
		'>5' and 'captialized' 
				  or 
		'<5' and 'non-capitalized' 

	are the appropriate responses. 

	N.B. The focus challange of the stimuli always come in pairs.	
	"""
	shuffle(seq)
	p = [seq.pop()]
	for x in seq:
		p.append(sim(x, p[-1]) if (x[0] in p[-1] or x[1] in p[-1]) else x)
		if len(p) > 3:
			if not (len(p) % 2) and isStreak(p[-4:]):
				p = correctStreak(p)
	p = repairSequence(p)
	testSanity(p, n)

def sim(orig, prev, next='!!'):
	"""Two subsequent stimuli have characters in common. Based on the typeset of
	orig generate and return a stimuli for which this is not the case. If the 
	next parameter is defined, make sure that the stimuli also does not have any
	characters in common with it. Next defaults to '!!', neither character are 
	used in the study.
	"""
	x, y = orig[0], orig[1]
	while x == prev[0] or x == next[0]:
		x = choice([NCP,CAP][isCaps(orig[0])])
	while y == prev[1] or y == next[1]:
		y = choice([LT5,GT5][isGT5(orig[1])])
	return x + y

def isStreak(s):
	""" Test whether the 4 provided stimuli may form a streak of the same response"""
	a, b, c, d = isType(s[0][0],s[1][0]), isType(s[2][0],s[3][0]), \
				 isType(s[0][1],s[1][1]), isType(s[2][1],s[3][1])
	if (a % 2 and a == b) or (a % 2 and a == d) or \
	   (c % 2 and c == b) or (c % 2 and c == d):
		return 1
	return 0

def isType(a,b):
	""" Return the typeset number of the stimuli"""
	return [[3,2],[0,1]][isLeft(a)][isLeft(b)]

def isLeft(s):
	""" Return 1 if 'left' is the correct response for the stimuli, else 0"""
	return (1 if s in NCP + LT5 else 0)

def correctStreak(p):
	""" Attempt 3 strategies in order of likely success, and keep track of the 
	'cost' of correcting the streak in terms of the additional incongurent or
	congruent stimuli this added to the sequence.

	Strategies with succes ratio:
		
	1. Invert response type, but maintain (in)congruence 		   --->    14/21
	2. Invert (in)congruence, direction based on 'left' response   --->   3.5/21
	3. Invert (in)congruence, direction based on 'right' response  --->   3.5/21

	"""
	global CON, ICN
	p[-1] = flip(p[-2:]) 											# Strategy 1
	if isStreak(p[-4:]):											
		p[-1] = flip(p[-2:])
		if isCongruent(p[-1]):
			CON += 1
		else:
			ICN += 1
		p[-1] = turn(p[-2:])										# Strategy 2
	if isStreak(p[-4:]):											
		p[-1] = flip(p[-2:])										# Strategy 3
	return p


def flip(stims):
	""" Change stimuli into a combination that abides by the type constrains, but
	does not require the same response, thereby upholding the first constraint, 
	without sacrificing the third."""
	while True:
		stim = newStim(isCongruent(stims[1]), 0 if isCaps(stims[1][0]) else 1)
		if not stim[0] in stims[0] and not stim[1] in stims[0]: break
	return stim

def turn(stims):
	while True:
		stim = newStim(abs(isCongruent(stims[1])-1), isCaps(stims[1][0]))
		if not stim[0] in stims[0] and not stim[1] in stims[0]: break
	return stim

def repairSequence(seq):
	"""Setup repair with length and direction of the repairs"""
	repairs = ICN - CON
	if repairs > 0:
		r = repair(seq, 0, repairs)
	elif repairs < 0:
		r = repair(seq, 1, repairs)
	return r

def repair(seq, congruence, repairs):
	"""Iterate through the sequence of stimuli and find stimuli which can change
	their (in)congruence without resulting in a response streak. When found,
	invert the (in)congruence of that stimuli. Repeat until an even number of 
	congruent and incongruent stimuli remain.

	"""
	for r in range(repairs):
		try:
			for i in range(3, len(seq), 2):
				if isCongruent(seq[i]) == congruence:
					continue
				temp = seq[i-3:i] + [turn(seq[i-1:i+1])] + seq[i+1:i+3]
				if temp[3][0] in temp[4] or temp[3][1] in temp[4]:
					temp[3] = sim(temp[3],temp[2],temp[4])
				if isStreak(temp[:4]) or isStreak(temp[-4:]):
					continue
				else:
					seq[i] = temp[3]
					break
		except IndexError:
			pass
	return seq
		
def isCaps(s):
	""" Return 1 if character is capitalized, else 0"""
	return (1 if s in CAP else 0)

def isGT5(s):
	""" Return 1 if character is greater than five, else 0"""
	return (1 if s in GT5 else 0)

def isCongruent(s):
	""" Return 1 if stimuli is congruent, else 0"""
	return (1 if (s[0] in CAP and s[1] in GT5) or \
		   (s[0] in NCP and s[1] in LT5) else 0)

def testSanity(p, n):
	""" Testing that both implicit and the three explicit constraints are upheld
	
	If one of the tests fails, the script runs again until a succesful set 
	matching all conditions is found.

	Test 0: Are sufficient stimuli generated? 
	Test 1: Are there an equal number of congruent and incongruent stimuli?
	Test 2: Does no stimuli contain a character present in the previous stimuli?
	Test 3: Does no sequence of 4 stimuli result in the same challange response?
	
	"""
	sanity = True
	congruent = 0
	if len(p) != n:														# Test 0
		sanity = False 
		print 'FAILED TEST 0: Missing Values', len(p), 'out of', str(n)
	for s in p:															# Test 1
		if isCongruent(s):
			congruent += 1
	if len(p) / 2 != congruent:
		sanity = False 
		print 'FAILED TEST 1: There are', str(congruent), 'congruent but', \
			   str(len(p)-congruent),'incongruent stimuli'
	for i in range(1, len(p)):											# Test 2
		if (p[i][0] in p[i-1] or p[i][1] in p[i-1]):
			sanity = False 
			print 'FAILED TEST 2:', p[i], '-->', p[i-1], 'at', str(i)
	conflictCount = 0
	for i  in range(3, len(p), 2) :										# Test 3
		if isStreak(p[i-3:i+1]):
			conflictCount += 1
			sanity = False 
			print 'FAILED TEST 3:', i-2, ':', p[i-3], p[i-2], p[i-1], p[i], \
			  'RESPONSE STREAK at', str(i+1)
	if sanity:
		print 'SUCCESFUL RUN - ALL CONDITIONS MET:'	
		print p
	else:
		print 'RUNNING AGAIN ...'	
		global CON, ICN
		CON, ICN = 0, 0
		genStims(464)

if __name__ == '__main__':
	global CON, ICN
	CON, ICN = 0, 0
	genStims(464)
