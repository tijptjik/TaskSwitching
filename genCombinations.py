from random import choice, shuffle

""" Generate Stimuli Sequences

Run with:

	python genCombinations.py

Generate a sequence of stimuli to be used in a task switching study. The stimuli
consist of two characters which each present the test subject with a classification 
challenge. In this case the challenges are to determine whether the 1st character
is a capitalised or not, and whether the 2nd character is lower or greater than 5.

The following characters are used:

Letters : ['e','d','h','t','R','B','A','F']
Numbers : ['1','2','3','4','6','7','8','9']

As '>5' and 'capitalized' as well as '<5' and 'non-capitalized' are mapped to 
the same response key, there are certain stimuli combinations which are 
congruent, where both characters have the same correct response, and in-congruent
stimuli, where the correct response for the characters differs.

Congruent are combinations of
	
   e, d, h, t  &  1, 2, 3, 4
	           or
   R, B, A, F  &  6, 7, 8, 9

In-congruent are combinations of

   e, d, h, t  &  6, 7, 8, 9
	           or
   R, B, A, F  &  1, 2, 3, 4

In order to fulfil study requirements, the following restrictions are placed 
upon the generation of stimuli:

1. Provide an equal number of congruent & in-congruent character pairs
2. The same character may not appear on two successive trials
3. The same response (i.e., capitalized, non-capitalized, <5, or >5) may not 
   appear on more than 3 successive trials.
"""

CAP,NCP,LT5,GT5 = ['R','B','A','F'],['e','d','h','t'],['1','2','3','4'],['6','7','8','9']

def genStims(n):
	""" Generate an equal number of congruent and in-congruent stimuli.
	:param n: number of stimuli to be generated
	:returns: list of stimuli
	"""
	stimSets = [[[],[]],[[],[]]]
	for i in range(4):
		while (len(stimSets[i % 2][(i/2) % 2]) * 4 < n):
			stimSets[i % 2][(i/2) % 2].append(newStim(i % 2, (i/2) % 2))
	return stimSets[0][0] + stimSets[0][1] + stimSets[1][0] + stimSets[1][1]

def newStim(con, cap):
	""" Return a random character pair abiding by the stimuli constraints.
	:param con: 1 for congruent, 0 for in-congruent
	:param cap: 1 for capitalized, 0 for non-capitalized
	:returns: a character pair
	"""
	options = [[[NCP,GT5],[CAP,LT5]], [[NCP,LT5],[CAP,GT5]]]
	return choice(options[con][cap][0]) + \
		   choice(options[con][cap][1]);

def shuffleSeq(seq):
	""" Randomise a given sequence of character pairs in which no character
	pair repeats a character from the previous pair, and in which no sequence
	of 4 character pairs warrants the same response from the test subject.

	In other words, no four stimuli should contain challenges for which 
		
		'>5' and 'capitalized' 
				  or 
		'<5' and 'non-capitalized' 

	are the appropriate responses. 

	Note: The study alternates the focus character in steps of two. I.e., it 
	will first challenge the test subject to focus on the numeric character of 
	the stimuli twice, then on the two subsequent alpha characters, then again on  
	two stimuli with a numeric focus. This somewhat relaxes the streak constraints.
	:param seq: list of stimuli  
	:returns: list of shuffled stimuli based on constraints
	"""
	shuffle(seq)
	p = [seq.pop()]
	for x in seq:
		p.append(sim(x, p[-1]) if (x[0] in p[-1] or x[1] in p[-1]) else x)
		if len(p) > 3:
			if not (len(p) % 2) and isStreak(p[-4:]):
				p = correctStreak(p)
	seq = repairSeq(p)
	return seq

def sim(orig, prev, next='!!'):
	"""Two adjacent stimuli have characters in common. Based on the stimuli
	constraints of orig, return a stimuli for which this is not the case.
	If the next parameter is defined, make sure that the stimuli also does not
	have any characters in common with it. Next defaults to '!!', neither 
	character are used in the study.
	:param orig: Character pair for which a similar substitute is required
	:param prev: Previous character pair in the stimuli sequence
	:param next: Subsequent character pair in the stimuli sequence
	:returns: Character pair similar to orig but not in conflict with prev or next
	"""
	x, y = orig[0], orig[1]
	while x == prev[0] or x == next[0]:
		x = choice([NCP,CAP][isCaps(orig[0])])
	while y == prev[1] or y == next[1]:
		y = choice([LT5,GT5][isGT5(orig[1])])
	return x + y

def isStreak(s):
	""" Test whether the 4 provided stimuli may form a streak of the same response
	:param s: list of 4 stimuli
	:returns: 1 for a streak, 0 for non-streak
	"""
	a, b, c, d = isType(s[0][0],s[1][0]), isType(s[2][0],s[3][0]), \
				 isType(s[0][1],s[1][1]), isType(s[2][1],s[3][1])
	if (a % 2 and a == b) or (a % 2 and a == d) or \
	   (c % 2 and c == b) or (c % 2 and c == d):
		return 1
	return 0

def isType(a,b):
	""" Determine the stimuli constraint type
	:param a: alpha character of the stimuli
	:param b: numeric character of the stimuli
	:returns: 0 for NCP/GT5, 1 for NCP/LT5 , 2 for CAP/GT5, 3 for CAP/LT5 
	"""
	return [[3,2],[0,1]][isLeft(a)][isLeft(b)]

def isLeft(c):
	"""Determine whether 'left' is the response for this particular character
	:param c: Single character of a stimuli
	:returns: 1 if 'left' is the correct response for the stimuli, else 0"""
	return (1 if c in NCP + LT5 else 0)

def correctStreak(s):
	""" Attempt to correct a streak of 4 stimuli, by altering the fourth 
	stimuli in place. One of 3 strategies is always succesful. Attempy them in 
	order of likely success, and keep track of the 'cost' of correcting the 
	streak in terms of the additional in-congruent or congruent stimuli added 
	to the sequence. Strategies used:
		
	1. Invert response type, but maintain (in)congruence
	2. Invert (in)congruence, direction based on 'left' response
	3. Invert (in)congruence, direction based on 'right' response
	
	:param s: list of 4 stimuli which form a streak
	:returns: list of 4 stimuli, not a streak
	"""
	global CON, ICN
	s[-1] = flip(s[-2:]) 											# Strategy 1
	if isStreak(s[-4:]):											
		s[-1] = flip(s[-2:])
		if isCongruent(s[-1]):
			CON += 1
		else:
			ICN += 1
		s[-1] = turn(s[-2:])										# Strategy 2
	if isStreak(s[-4:]):											
		s[-1] = flip(s[-2:])										# Strategy 3
	return s


def flip(s):
	""" Change stimuli into a combination that abides by the stimuli constrains,
	but does not require the same response, thereby upholding the first 
	study requirement, without sacrificing the third.
	:param s: list of 2 character pairs
	:returns: Character pair
	"""
	while True:
		stim = newStim(isCongruent(s[1]), 0 if isCaps(s[1][0]) else 1)
		if not stim[0] in s[0] and not stim[1] in s[0]: break
	return stim

def turn(s):
	""" Invert the stimuli constraints of a character pair.
	:param s: list of 2 character pairs
	:returns: Character pair
	"""
	while True:
		stim = newStim(abs(isCongruent(s[1])-1), isCaps(s[1][0]))
		if not stim[0] in s[0] and not stim[1] in s[0]: break
	return stim

def repairSeq(seq):
	"""Setup repair with length and direction of the repairs
	:param seq: List of stimuli with unbalanced congruence numbers
	:returns: List of stimuli with rebalanced congruence numbers
	"""
	repairs = ICN - CON
	if repairs > 0:
		r = repair(seq, 0, repairs)
	elif repairs < 0:
		r = repair(seq, 1, repairs)
	return r

def repair(seq, con, rep):
	"""Iterate through the sequence of stimuli and find stimuli which can change
	their (in)congruence without resulting in a response streak. When found,
	invert the (in)congruence of that stimuli. Repeat until an even number of 
	congruent and in-congruent stimuli remain.
	:param seq: List of stimuli with unbalanced congruence numbers
	:param con: 0 for change from ICN --> CON, 1 for change from CON --> ICN
	:param rep: integer of repairs needed
	:returns: List of stimuli with rebalanced congruence numbers
	"""
	for r in range(rep):
		try:
			for i in range(3, len(seq), 2):
				if isCongruent(seq[i]) == con:
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
	""" Determine if character is CAPitalized 
	:param s: Character
	:returns 1 if character is capitalized, else 0
	"""
	return (1 if s in CAP else 0)

def isGT5(s):
	""" Determine if character is Greater Than 5. 
	:param s: Character
	:returns: 1 if character is greater than five, else 0
	"""
	return (1 if s in GT5 else 0)

def isCongruent(s):
	""" Determine whether two character are congruent.
	:param s: Character
	:returns: 1 if stimuli is congruent, else 0
	"""
	return (1 if (s[0] in CAP and s[1] in GT5) or \
		   (s[0] in NCP and s[1] in LT5) else 0)

def testSanity(seq, n):
	""" Testing that both implicit and the three explicit constraints are upheld
	
	If one of the tests fails, the script runs again until a succesful set 
	matching all conditions is found.

	Test 0: Are sufficient stimuli generated? 
	Test 1: Are there an equal number of congruent and incongruent stimuli?
	Test 2: Does no stimuli contain a character present in the previous stimuli?
	Test 3: Does no sequence of 4 stimuli result in the same challange response?
	
	:param seq: List of stimuli
	:param n: Number of stimuli to be generated
	:returns: True if sequence of stimuli passes all the test, else False
	"""
	sanity = True
	congruent = 0
	if len(seq) != n:													# Test 0
		sanity = False 
		print 'FAILED TEST 0: Missing Values', len(seq), 'out of', str(n)
	for s in seq:														# Test 1
		if isCongruent(s):
			congruent += 1
	if len(seq) / 2 != congruent:
		sanity = False 
		print 'FAILED TEST 1: There are', str(congruent), 'congruent but', \
			   str(len(seq)-congruent),'incongruent stimuli'
	for i in range(1, len(seq)):										# Test 2
		if (seq[i][0] in seq[i-1] or seq[i][1] in seq[i-1]):
			sanity = False 
			print 'FAILED TEST 2:', seq[i], '-->', seq[i-1], 'at', str(i)
	conflictCount = 0
	for i  in range(3, len(seq), 2) :									# Test 3
		if isStreak(seq[i-3:i+1]):
			conflictCount += 1
			sanity = False 
			print 'FAILED TEST 3:', i-2, ':', seq[i-3], seq[i-2], seq[i-1], \
			 	  seq[i], 'RESPONSE STREAK at', str(i+1)
	return True if sanity else False
	
if __name__ == '__main__':
	global CON, ICN
	CON, ICN = 0, 0
	n = 464
	stims = genStims(n)
	seq = shuffleSeq(stims)
	print seq if testSanity(seq, n) else ''
