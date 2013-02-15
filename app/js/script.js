// Definitions
// 
// Session > Segment > Unit > UnitPair > Block > Trial
// 
//        Trial : A single request for input
// 		  Block : The smallest set of related trials  
// 		   Unit : A set of blocks for which all testing parameters are equal 
// 	   UnitPair : Two units for which the order of appearance is random.
// 		Segment : The set of blocks related by the phenomena they are testing
// 		Session : A full run where all relevant segments are addressed
// 
// Specifications
//  
// 	   Segments : Dual Task (1),Switch Task (0)
//  Block Modes : Vertical (1), Horizontal (0)

// URL Query Variables
// 
// 	User ID = 'testsubject' , string
//	Instruction Set = 'instruction', ['vertical'|'horizontal']
// 	Session Number = session, [0,1,2,3]

// Global Parameters
var GlobalQset,
	stimPriority;

// Session Parameters
var session      = 0,
	userID		 = "anon",
	verticalMode = false,
	dualTaskMode = false;
	
// Stimuli Sets
var alphanumeric = [['D9', 'T8', 'I5', 'E4', 'U8', 'R5', 'A6', 'D5', 'T4', 'U9', 'R2', 'I7', 'T8', 'N5', 'E4', 'I3', 'A8', 'T3', 'R6', 'A5', 'D7', 'A6', 'T8', 'U4', 'R5', 'I4', 'N7', 'R3', 'A6', 'T3', 'A2', 'E7', 'A6', 'D8', 'R3', 'I4', 'D7', 'E8', 'U6', 'D9', 'U4', 'R3', 'E5', 'N8', 'T7', 'I4', 'E9', 'R3', 'N6', 'U7', 'D6', 'T2', 'U5', 'R2', 'A8', 'I5', 'D9', 'I4', 'N5', 'T2', 'A5', 'I4', 'N3', 'I8', 'D3', 'I4', 'R2', 'E8', 'R3', 'A6', 'N8', 'D5', 'E7', 'T6', 'I5', 'T8', 'R3', 'I5', 'N6', 'T7', 'R8', 'U7', 'I6', 'N8', 'D9', 'I4', 'U5', 'I2', 'T9', 'D2', 'R3', 'U8', 'T3', 'A5', 'D2', 'T9', 'D4', 'A9', 'E4', 'N9', 'U4', 'I5', 'U6', 'N5', 'D4', 'E9', 'T3', 'D9', 'A8', 'D3', 'R4', 'U3', 'N4', 'I8', 'N9', 'I2', 'N6', 'U2', 'A9', 'N8', 'A2', 'N9', 'U2', 'N4', 'T7', 'E6', 'N9', 'U3', 'R8', 'T7', 'U3', 'E9', 'T4', 'D8', 'N6', 'U9', 'N8', 'U6', 'A5', 'D4', 'U2', 'R3', 'E6', 'N7', 'A2', 'E5', 'R4', 'D8', 'E4', 'A7', 'D6', 'I2', 'D9', 'A4', 'E5', 'T7', 'R2', 'A8', 'U5', 'I4', 'D7', 'A6', 'T2', 'U3', 'R9', 'U4', 'N2', 'I5', 'T4', 'U9', 'T3', 'U2', 'N5', 'E6', 'T2', 'E3', 'R8', 'I5', 'D8', 'R9', 'T6', 'A9', 'D3', 'R8', 'N3', 'E6', 'U5', 'A7', 'N2', 'T5', 'U2', 'A5', 'U4', 'R3', 'D2', 'R4', 'U9', 'I4', 'D9', 'I8', 'D9', 'T6', 'I4', 'E3', 'R2', 'I5', 'E8', 'N9', 'R8', 'E6', 'U9', 'A2', 'T8', 'D5', 'E3', 'U2', 'R6', 'N4', 'A5', 'D8', 'I9', 'R7', 'N4', 'U9', 'N8', 'A5', 'U8', 'D2', 'A5', 'I4', 'T3', 'R6', 'N3', 'A2', 'T7', 'N5', 'R8', 'E9', 'I7', 'E4', 'N9', 'D8', 'I2', 'E9', 'R5', 'D4', 'R7', 'U6', 'R9', 'N6', 'I3', 'E4', 'U7', 'T4', 'R6', 'U8', 'E3', 'N4', 'A7', 'I6', 'N9', 'D6', 'N5', 'I8', 'E9', 'T2', 'R7', 'U6', 'E5', 'R9', 'I2', 'D7', 'U5', 'I4', 'T6', 'R3', 'U6', 'T7', 'I8', 'E7', 'I2', 'R7', 'T4', 'A8', 'E5', 'D2', 'T5', 'N7', 'A4', 'N9', 'U2', 'A6', 'D7', 'A2', 'T9', 'R6', 'A8', 'N7', 'I2', 'A9', 'D3', 'I6', 'T5', 'A7', 'E3', 'D8', 'T9', 'D7', 'I6', 'T7', 'D2', 'E9', 'R7', 'N2', 'E7', 'I9', 'U8', 'T7', 'N4', 'U8', 'N9', 'I7', 'D3', 'T4', 'A7', 'N6', 'I8', 'E3', 'A6', 'T7', 'E4', 'A9', 'T4', 'D5', 'U3', 'D4', 'N2', 'R5', 'A7', 'I8', 'T4', 'A3', 'I4', 'R6', 'U9', 'I4', 'D2', 'E9', 'D4', 'E5', 'U2', 'R5', 'U8', 'D3', 'I6', 'U2', 'T8', 'A5', 'I2', 'R5', 'U4', 'T3', 'I8', 'R7', 'I2', 'T7', 'D5', 'T2', 'U3', 'A4', 'I7', 'N8', 'D9', 'A7', 'U4', 'T7', 'A4', 'I3', 'N8', 'I5', 'U4', 'I9', 'D4', 'U5', 'R3', 'T6', 'R5', 'A6', 'U7', 'E2', 'R4', 'E7', 'I3', 'U7', 'R8', 'N6', 'A2', 'E9', 'N6', 'T3', 'U2', 'I3', 'U6', 'D9', 'E8', 'R6', 'U4', 'A3', 'E5', 'T8', 'I5', 'T6', 'I5', 'T2', 'I5', 'E6', 'N5', 'D8', 'I2', 'A7', 'E4', 'D9', 'R4', 'A2', 'D5', 'A7', 'N2', 'E9', 'R4', 'N7', 'E9', 'I7', 'T8', 'E5', 'T9', 'R5', 'E4', 'N5', 'A7', 'I2', 'R6', 'I4', 'U9', 'T8', 'D5', 'U8', 'D7', 'E2', 'D8', 'E5', 'I6', 'T5', 'E8', 'R9', 'U4', 'R3', 'A9', 'N2', 'R7', 'N2', 'I3', 'E4', 'I5', 'D4'],
					['I2', 'E4', 'U7', 'R2', 'D3', 'E5', 'D8', 'T5', 'R3', 'E2', 'R5', 'A2', 'T6', 'U8', 'R9', 'U5', 'E9', 'N6', 'E7', 'I4', 'R9', 'T6', 'D9', 'A8', 'U5', 'T8', 'U9', 'D8', 'U7', 'D3', 'T8', 'R3', 'I5', 'A8', 'T3', 'I2', 'T9', 'N6', 'A5', 'U3', 'N7', 'E6', 'T3', 'D2', 'T3', 'I5', 'T2', 'E6', 'N3', 'U4', 'R5', 'I7', 'E4', 'T7', 'N4', 'E6', 'T3', 'E6', 'I3', 'D8', 'E7', 'N3', 'T8', 'N3', 'A8', 'T3', 'A8', 'R3', 'D6', 'E9', 'D6', 'A3', 'D5', 'T6', 'R9', 'E7', 'A3', 'N2', 'D3', 'I2', 'E9', 'R5', 'U8', 'N7', 'I2', 'E7', 'T4', 'D8', 'U7', 'D5', 'E8', 'N9', 'I7', 'T4', 'E8', 'U7', 'A4', 'R8', 'N2', 'E9', 'I8', 'R4', 'A9', 'U4', 'R8', 'E2', 'R5', 'U4', 'A5', 'T8', 'I2', 'R4', 'E5', 'I9', 'N2', 'E7', 'A5', 'E9', 'N2', 'T7', 'R4', 'I5', 'U6', 'D5', 'T2', 'U8', 'R5', 'E8', 'T7', 'I9', 'E6', 'T9', 'E4', 'R7', 'E4', 'U3', 'E8', 'N6', 'I9', 'A2', 'T3', 'E2', 'N8', 'E3', 'T8', 'E4', 'T6', 'A3', 'N8', 'E3', 'U2', 'R4', 'I6', 'E5', 'A2', 'T8', 'E6', 'U9', 'D4', 'R2', 'T7', 'U8', 'I3', 'R7', 'E2', 'R8', 'D7', 'I4', 'A5', 'U2', 'D8', 'A2', 'E9', 'A3', 'R4', 'U5', 'T8', 'N6', 'T7', 'I3', 'U4', 'N7', 'R4', 'U2', 'T5', 'U6', 'I2', 'R3', 'A4', 'T9', 'I8', 'U9', 'R3', 'D8', 'I5', 'R2', 'N9', 'D6', 'I9', 'A3', 'I7', 'D8', 'N3', 'I7', 'N4', 'D7', 'I9', 'R6', 'D3', 'I5', 'R9', 'U6', 'T4', 'I5', 'D6', 'U5', 'R6', 'N5', 'A4', 'E7', 'A3', 'N4', 'A8', 'I9', 'E2', 'R8', 'N3', 'U6', 'R9', 'A6', 'T9', 'E5', 'A8', 'R2', 'D7', 'E9', 'A7', 'T8', 'E9', 'N6', 'U3', 'N7', 'T2', 'I3', 'N8', 'I9', 'U6', 'N3', 'E2', 'R5', 'E8', 'R5', 'N9', 'I7', 'T6', 'R2', 'E6', 'N7', 'A6', 'I9', 'D5', 'U2', 'N9', 'R4', 'U2', 'A7', 'T3', 'R8', 'I6', 'U5', 'A8', 'R4', 'T2', 'A3', 'T4', 'N5', 'T6', 'E9', 'D4', 'I9', 'R7', 'T5', 'I2', 'R9', 'U2', 'E9', 'A8', 'N4', 'U7', 'N3', 'E4', 'D7', 'U2', 'N9', 'I6', 'N7', 'E6', 'I7', 'R6', 'I4', 'A5', 'E2', 'T6', 'I5', 'E6', 'R3', 'U8', 'A7', 'D3', 'A4', 'N2', 'E5', 'D3', 'N8', 'E9', 'R2', 'D4', 'E3', 'A9', 'R6', 'N9', 'E2', 'D7', 'E6', 'U3', 'R8', 'U7', 'A4', 'I9', 'T8', 'D7', 'I4', 'D3', 'I2', 'R7', 'T2', 'N4', 'I9', 'A3', 'E4', 'R6', 'E7', 'I2', 'E6', 'N3', 'U4', 'A3', 'U9', 'D6', 'N9', 'A3', 'E8', 'N3', 'T6', 'U3', 'E2', 'N4', 'I5', 'N6', 'R2', 'T9', 'E5', 'A3', 'N4', 'T7', 'E9', 'R3', 'U2', 'T8', 'U6', 'R7', 'A2', 'T3', 'R9', 'U3', 'D6', 'N5', 'E9', 'N3', 'E4', 'R9', 'N4', 'T7', 'A6', 'D3', 'E2', 'A5', 'T9', 'A2', 'D8', 'I6', 'U9', 'N6', 'D3', 'N2', 'I3', 'T8', 'U7', 'D5', 'U9', 'T2', 'D6', 'T9', 'E4', 'I7', 'R3', 'T2', 'R5', 'I7', 'D5', 'N6', 'D5', 'I8', 'N5', 'D8', 'T7', 'A2', 'T7', 'D3', 'R5', 'I2', 'D9', 'U6', 'E5', 'U4', 'N3', 'A4', 'D8', 'R6', 'U3', 'A4', 'E2', 'D6', 'A3', 'R4', 'I7', 'E5', 'D8', 'T4', 'U9', 'I3', 'R4', 'I5', 'E6', 'U9', 'N4', 'I8', 'N9', 'E3', 'T9', 'R8', 'D2', 'A3', 'N7', 'D2', 'I3', 'U9', 'D6', 'N9', 'I2', 'D3', 'U4', 'T7', 'D3'],
					['R9', 'A8', 'U7', 'R2', 'E9', 'D6', 'N3', 'D4', 'E5', 'T8', 'A2', 'I5', 'N7', 'I8', 'R6', 'N7', 'E8', 'N5', 'U3', 'I5', 'R8', 'A7', 'R9', 'N8', 'U6', 'N3', 'U9', 'T3', 'A4', 'D3', 'I4', 'A7', 'N2', 'E8', 'A3', 'I9', 'N8', 'I9', 'R3', 'U6', 'R8', 'E9', 'T3', 'E9', 'R8', 'U4', 'I2', 'A9', 'R6', 'D2', 'U7', 'I8', 'D3', 'I6', 'R8', 'I3', 'N2', 'U9', 'A3', 'T7', 'N8', 'U4', 'I7', 'T8', 'R2', 'E4', 'N5', 'U6', 'E5', 'R2', 'T8', 'I5', 'U2', 'R9', 'E2', 'N9', 'A2', 'T9', 'A4', 'U9', 'E8', 'T6', 'A2', 'N9', 'U8', 'R3', 'A2', 'T7', 'I6', 'E9', 'D4', 'T8', 'D5', 'A8', 'E3', 'D6', 'T7', 'R3', 'I5', 'D6', 'R7', 'T8', 'U3', 'I9', 'U6', 'T9', 'E6', 'U7', 'N9', 'T4', 'U9', 'D3', 'T8', 'A6', 'R3', 'U9', 'R3', 'D4', 'N9', 'A7', 'N5', 'U8', 'D3', 'A2', 'D8', 'A7', 'T9', 'E8', 'T5', 'R8', 'T9', 'I8', 'A3', 'U9', 'D8', 'I2', 'U9', 'R7', 'U4', 'R7', 'U2', 'A7', 'N8', 'D7', 'I2', 'E5', 'D8', 'R3', 'E6', 'U9', 'E4', 'D9', 'E2', 'R8', 'I4', 'D5', 'I8', 'N7', 'A5', 'T6', 'D5', 'E4', 'U9', 'T6', 'E4', 'U5', 'E2', 'D9', 'N8', 'D3', 'I4', 'U9', 'R7', 'U6', 'T8', 'R7', 'A3', 'R8', 'T9', 'R7', 'I9', 'R8', 'A7', 'E3', 'T4', 'R5', 'E6', 'D3', 'E5', 'N7', 'D2', 'I5', 'T4', 'A5', 'E8', 'D4', 'N5', 'I3', 'T7', 'E8', 'R4', 'T7', 'U2', 'D9', 'I3', 'N6', 'I7', 'U3', 'I6', 'T4', 'N5', 'E7', 'A3', 'N8', 'R6', 'U2', 'N3', 'E4', 'R8', 'E7', 'N2', 'T6', 'I7', 'E5', 'D8', 'E9', 'U7', 'I4', 'T8', 'R3', 'E2', 'D7', 'R2', 'N8', 'E5', 'N2', 'R5', 'U9', 'E2', 'R3', 'T4', 'U5', 'N3', 'T8', 'N3', 'U9', 'I7', 'D6', 'E3', 'I4', 'N6', 'E2', 'D7', 'I8', 'E5', 'D3', 'E6', 'D8', 'N9', 'U8', 'I7', 'E8', 'D5', 'E6', 'I9', 'N5', 'E8', 'T4', 'N5', 'A9', 'E7', 'T4', 'I7', 'R8', 'N5', 'E6', 'D9', 'I2', 'U5', 'N7', 'U4', 'N9', 'U6', 'A3', 'E2', 'T9', 'A2', 'T8', 'D5', 'A8', 'N3', 'E8', 'U4', 'A7', 'R2', 'T3', 'I7', 'U9', 'T8', 'N4', 'D2', 'A9', 'E8', 'I2', 'R4', 'I5', 'R9', 'T6', 'R7', 'U2', 'E9', 'I5', 'D4', 'A5', 'E8', 'N9', 'D2', 'T3', 'A2', 'N7', 'T9', 'R8', 'U9', 'R2', 'N8', 'U3', 'R2', 'A7', 'R4', 'I5', 'U9', 'T6', 'A8', 'I4', 'U9', 'T6', 'U9', 'D4', 'N6', 'E3', 'D4', 'N7', 'E5', 'U4', 'R3', 'N2', 'U9', 'N8', 'T9', 'I6', 'D7', 'A4', 'R9', 'I7', 'A2', 'D5', 'T4', 'E2', 'T7', 'I5', 'U8', 'D6', 'N5', 'U2', 'I9', 'T7', 'N2', 'A7', 'T4', 'N8', 'R4', 'U5', 'A4', 'N6', 'U3', 'I6', 'R9', 'A8', 'I7', 'E2', 'D4', 'T7', 'E5', 'R4', 'E9', 'T3', 'E8', 'D7', 'U2', 'R7', 'E6', 'N7', 'I8', 'U9', 'R4', 'T5', 'U7', 'R6', 'U4', 'I7', 'E2', 'D7', 'A6', 'R7', 'N5', 'T4', 'I5', 'D4', 'U2', 'E6', 'I7', 'D2', 'E7', 'A2', 'R4', 'A3', 'E4', 'D8', 'N5', 'A9', 'R8', 'N3', 'I2', 'U5', 'R3', 'D6', 'N7', 'E9', 'I4', 'N5', 'E4', 'R9', 'E6', 'U3', 'E2', 'N4', 'T2', 'A3', 'U4', 'T5', 'R4', 'I5', 'E3', 'U5', 'T2', 'U3', 'E7', 'U2', 'R9', 'A4', 'T3', 'R5', 'T4', 'I9', 'E3', 'U5', 'N6', 'T4', 'I2', 'R7', 'U2', 'T9', 'N3', 'R4'],
					['T6', 'D4', 'E5', 'A3', 'R7', 'N2', 'A8', 'U3', 'D8', 'U4', 'R5', 'A7', 'E4', 'D2', 'U3', 'A2', 'N7', 'I4', 'U9', 'R4', 'D3', 'N8', 'I5', 'T4', 'D9', 'E5', 'I9', 'R8', 'N7', 'A6', 'U3', 'N6', 'U2', 'R5', 'I4', 'T5', 'D3', 'T4', 'I9', 'R2', 'T7', 'N5', 'U6', 'N9', 'A4', 'R8', 'N7', 'I5', 'D8', 'E2', 'A7', 'I2', 'N7', 'I2', 'E8', 'I2', 'T5', 'E8', 'U5', 'N8', 'T3', 'U5', 'R6', 'T7', 'U5', 'I4', 'T7', 'A6', 'T4', 'N5', 'E2', 'N7', 'U5', 'I7', 'D8', 'E3', 'R2', 'D4', 'T5', 'E8', 'U3', 'I8', 'T7', 'A2', 'I9', 'E6', 'D7', 'T4', 'E8', 'U5', 'T3', 'R2', 'I7', 'T4', 'E7', 'A6', 'E7', 'N4', 'D5', 'I4', 'A5', 'T7', 'D8', 'R5', 'E9', 'T5', 'D8', 'N7', 'A3', 'I6', 'N5', 'T4', 'D9', 'I7', 'U2', 'D7', 'R6', 'D3', 'I7', 'D8', 'I6', 'A3', 'U8', 'N9', 'U2', 'I6', 'A9', 'N6', 'T7', 'D3', 'I6', 'N3', 'A8', 'T7', 'I8', 'E6', 'A7', 'N8', 'I7', 'D2', 'I7', 'R3', 'N5', 'A4', 'N3', 'D8', 'A4', 'D9', 'U4', 'N3', 'I4', 'D9', 'R2', 'U5', 'E4', 'A9', 'N2', 'T6', 'U4', 'I3', 'A6', 'N8', 'A9', 'N3', 'E2', 'N5', 'A3', 'N7', 'R6', 'D7', 'E3', 'N8', 'E4', 'I7', 'N2', 'T8', 'U5', 'E2', 'A4', 'N3', 'A2', 'U5', 'I2', 'R5', 'U2', 'N7', 'A3', 'N2', 'R3', 'U8', 'E7', 'I6', 'N2', 'U9', 'I2', 'U7', 'T8', 'D9', 'I7', 'E4', 'R7', 'N6', 'A3', 'D8', 'R7', 'I2', 'R9', 'A6', 'U9', 'D5', 'I6', 'N5', 'A7', 'D8', 'E5', 'T7', 'R8', 'N5', 'I6', 'A9', 'U8', 'D2', 'U8', 'A7', 'D2', 'A3', 'D7', 'U6', 'D8', 'A3', 'T9', 'N2', 'I3', 'N4', 'D5', 'R4', 'E5', 'U3', 'N8', 'U9', 'R7', 'T4', 'A2', 'D7', 'A5', 'D4', 'N8', 'D3', 'E5', 'U7', 'N4', 'A5', 'U6', 'R2', 'E3', 'N6', 'D5', 'U8', 'E7', 'U3', 'D8', 'N2', 'A5', 'N2', 'D7', 'I4', 'A9', 'E8', 'T3', 'I2', 'N4', 'U2', 'E9', 'U2', 'T3', 'D8', 'T3', 'E9', 'R2', 'N6', 'R7', 'I5', 'T4', 'U5', 'N7', 'U8', 'R9', 'U6', 'E9', 'A3', 'T4', 'E3', 'U7', 'R8', 'N9', 'D4', 'I5', 'T8', 'A4', 'R3', 'E4', 'I3', 'T4', 'A5', 'U2', 'N7', 'T8', 'I2', 'D9', 'E5', 'N4', 'T6', 'I7', 'R5', 'A6', 'N9', 'T4', 'U8', 'I5', 'R2', 'D9', 'N5', 'A2', 'D5', 'N6', 'T5', 'I8', 'N9', 'A5', 'R4', 'I8', 'N4', 'U7', 'N8', 'A6', 'D9', 'A7', 'E4', 'R5', 'I4', 'U3', 'E2', 'D7', 'R6', 'I2', 'E5', 'A6', 'D3', 'U2', 'D5', 'A9', 'I6', 'N4', 'T5', 'E2', 'U7', 'D4', 'T8', 'N7', 'A2', 'I9', 'D2', 'E5', 'R7', 'D5', 'N6', 'E3', 'D6', 'A3', 'N8', 'D7', 'N8', 'E7', 'U5', 'I4', 'T2', 'E5', 'D7', 'R6', 'I4', 'U3', 'A9', 'T8', 'D4', 'N2', 'I3', 'U7', 'E6', 'D5', 'I6', 'U7', 'A4', 'N9', 'T8', 'U9', 'R4', 'D8', 'N7', 'E8', 'U9', 'A2', 'N8', 'A2', 'U3', 'R4', 'A7', 'N6', 'T3', 'U9', 'T3', 'A8', 'D7', 'T2', 'R3', 'A7', 'D5', 'R8', 'E5', 'U3', 'I9', 'D2', 'I7', 'U6', 'N2', 'U3', 'R8', 'E3', 'U7', 'T6', 'N8', 'R7', 'U3', 'I5', 'D6', 'A8', 'U3', 'I4', 'R2', 'U6', 'I7', 'N9', 'T6', 'E3', 'A7', 'U8', 'N2', 'E7', 'I6', 'N5', 'E8', 'I9', 'D6', 'T8', 'A6', 'N5', 'E4', 'I6', 'R2', 'E3', 'U5', 'T4', 'D3', 'I9', 'U8']],
	sessionSet;

// Timers
var baseTime = new Date(),
	tid,
	start,
    newTrialTime = 0,
    focusTime = 0,
    stimuliTimeOut = 1000,
    StimuliIntervalBaseTime = 0,
    trueStimuliIntervalBaseTime = 50,
 	trueTrialTime = 50,
    falseStimuliIntervalBaseTime = 0,
    falseTrialTime = 0,
	newTrialTime = 1900,
	focusTime = 100,
	stimuliTimeOut = 5000,
	StimuliIntervalBaseTime = 200,
	trueStimuliIntervalBaseTime = 150,
	trueTrialTime = 50,
	falseStimuliIntervalBaseTime = 1000,
	falseTrialTime = 500;

// Counters
var slideCounter = 0,
	trialCounter = 0,
	blockCounter = 0;

// Messages
var speedAdvice = "nog sneller te reageren",
	accuracyAdvice = "nog minder fouten te maken",
	correctAdvice = "zo door te gaan",
	correctResponse = "goed",
	incorrectResponse = "fout";

// Slide Order
// [~~(dualBlock)][~~(realBlock)][~~(clockBlock)][~~(bothBlock)][~~(numbersBlock)][~~(NoAidBlock)];
var trialOrder = [],
	trialBlocks = {
		'switch-practice-letters-instructions-example' : [[false,false,false,false,false,false,12],[false,false,false,false,false,true,12]],
        'switch-practice-numbers-instructions-example' : [[false,false,false,false,true,false,12],[false,false,false,false,true,true,12]],
        'switch-practice-both-letters-instructions' : [[false,false,false,true,false,true,24]],
        'switch-practice-both-numbers-instructions' : [[false,false,false,true,true,true,24]],
        'switch-practice-both-2-results' : [[false,false,true,false,null,false,16],[false,false,true,false,null,true,16]],
        'switch-real-summary' : [[false,true,true,false,null,true,48],[false,true,true,false,null,true,48],[false,true,true,false,null,true,48],[false,true,true,false,null,true,48]],
        'dual-practice-letters-instuctions' : [[true,false,false,false,false,false,12],[true,false,false,false,false,true,12],[true,true,false,false,false,true,48]],
        'dual-practice-numbers-instuctions' : [[true,false,false,false,true,false,12],[true,false,false,false,true,true,12],[true,true,false,false,true,true,48]]
		},
	blockIndex = ["1","2","1","2","1","1","1","2","1","2","3","4","1","2","3","1","2","3"],
	slideOrder = [],
	slides = {
	  0:[ // L1 Unit
		"welcome",
	    "switch-introduction",
	    "switch-introduction-extended"],
	  1:[ // L1 Unit
	      [ // L2 Random Order
	    	["switch-practice-letters-instructions-1","switch-practice-letters-instructions-2"], // L3 VerticalMode
		    "switch-practice-letters-instructions-example",
		    "switch-practice-letters-pre-practice-1",
		    "trials",
		    "switch-practice-letters-results-1",
		    "switch-practice-letters-pre-practice-2",
		    "trials",
		    "switch-practice-letters-results-2"],
		  [
    		["switch-practice-numbers-instructions-1","switch-practice-numbers-instructions-2"],
		    "switch-practice-numbers-instructions-example",
		    "switch-practice-numbers-pre-practice-1",
		    "trials",
		    "switch-practice-numbers-results-1",
		    "switch-practice-numbers-pre-practice-2",
		    "trials",
		    "switch-practice-numbers-results-2"
		  ]
		],
	  2:[ // L1 Unit
	      "empty-slide-hack",
	      ["switch-practice-both-instructions-1", "switch-practice-both-instructions-2"] // L3 VerticalMode
	    ],
	  3:[ // L1 Unit
    	  [ // L2 Random Order
    	  "switch-practice-both-numbers-instructions",
    	  "trials"],
    	  [
    	  "switch-practice-both-letters-instructions",
    	  "trials"]
		],
	  4:[ // L1 Unit
	  	  "empty-slide-hack",
		  ["switch-practice-clock-instructions-1","switch-practice-clock-instructions-2"], // L3 VerticalMode
	      ["switch-practice-clock-example-1","switch-practice-clock-example-2"],
	      ["switch-practice-clock-instructions-extended-1","switch-practice-clock-instructions-extended-2"],
	      ["switch-practice-clock-instructions-summary-1","switch-practice-clock-instructions-summary-2"],
	      "trials",
	      "switch-practice-clock-results-1",
	      "switch-practice-clock-pre-2",
	      "trials",
	      "switch-practice-clock-results-2",
	      ["switch-real-instructions-1","switch-real-instructions-2"],
	      "switch-real-summary",
	      "trials",
	      "switch-real-results-1",
	      "trials",
	      "switch-real-results-2",
	      "trials",
	      "switch-real-results-3",
	      "trials",
	      "switch-real-results-4"],
	   5:
	    [ // L1 Unit
	    	[  // L2 Random Order
			    "dual-practice-letters-instuctions",
			    "dual-practice-letters-example-0",
			   ["dual-practice-letters-example-1", "dual-practice-letters-example-2"],
			    "dual-practice-letters-pre",
			    "dual-practice-letters-pre-extended",
			    "trials",
			    "dual-practice-letters-results-1",
			    "dual-practice-letters-pre-2",
			    "trials",
			    "dual-practice-letters-results-2",
			    "dual-real-letters-pre",
			    "trials"
			],
			[
			    "dual-practice-numbers-instuctions",
			    "dual-practice-numbers-example-0",
			   ["dual-practice-numbers-example-1","dual-practice-numbers-example-2"],
			    "dual-practice-numbers-pre",
			    "dual-practice-numbers-pre-extended",
			    "trials",
			    "dual-practice-numbers-results-1",
			    "dual-practice-numbers-pre-2",
			    "trials",
			    "dual-practice-numbers-results-2",
			    "dual-real-numbers-pre",
			    "trials"
			]
		]
	}

// Collected Data
var tapassData = {  
	"user": "",
	"session": 0,
	"instructions": "",
	"date": baseTime.getTime(),
	"segment": "",
	"unit": "",
	"block": 1,
	"real": true,
	"data": []
	},
	userData

/**
 * Key Bindings
 */

function disableSpacebar(){
	key.deleteScope('all')
	key('esc', function(){
		$('article:visible').hide()
		close()
	});
}

function enableSpacebar(){
	key.deleteScope('all')
	key('space', function(){ nextSlide()})
	key('esc', function(){
		$('article:visible').hide()
		close()
	})
}

/**
 * Data Functions
 */

function newTapassData(segment, real, unit){
	data = tapassData
	data["user"] = userID
	data["session"] = session
	if (verticalMode){
		data["instructions"] = 'vertical'
	} else {
		data["instructions"] = 'horizontal'
	}
	if (segment){
		data["segment"] = 'dual'
	} else {
		data["segment"] = 'switch'
	}
	data["unit"] = unit
	data["block"] = blockIndex[blockCounter]
	data["real"] = real
	return data
} 							

function getTrialUnit(curTrial){
	if (curTrial[0]){
		if (curTrial[4]){ return 'numbers'
		} else { return 'letters'}
	} else if ((curTrial[2])){
		return 'clock'
	} else if ((curTrial[3])){
		return 'both'
	} else if ((curTrial[4])){
		return 'numbers'
	} else {
		return 'letters'
	}
}

function checkAnswer(stimuli, position, response){
	if (response === null) { return null } // No user input detected
	if(verticalMode){
		if ((position == 'Q1' && stimPriority) || (position == 'Q3' && stimPriority) || (position == 'Q2' && !stimPriority) || (position == 'Q4' && !stimPriority)){ // Numbers
			if (response == 'left'){
				return ($.inArray(stimuli.charAt(1), ['2', '4', '6', '8']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(1), ['3', '5', '7', '9']) == -1) ? false : true
			}
		}
		else if ((position == 'Q2' && stimPriority) || (position == 'Q4' && stimPriority) || (position == 'Q1' && !stimPriority) || (position == 'Q3' && !stimPriority)){ // Letters
			if (response == 'left'){
				return ($.inArray(stimuli.charAt(0), ['N', 'T', 'R', 'D']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(0), ['E', 'A', 'I', 'U']) == -1) ? false : true
			}
		}
	} else {
		if ((position == 'Q1' && stimPriority) || (position == 'Q2' && stimPriority) || (position == 'Q3' && !stimPriority) || (position == 'Q4' && !stimPriority)){ // Letters
			if (response == 'left'){
				return ($.inArray(stimuli.charAt(0), ['N', 'T', 'R', 'D']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(0), ['E', 'A', 'I', 'U']) == -1) ? false : true
			}
		}
		else if ((position == 'Q3' && stimPriority) || (position == 'Q4' && stimPriority) || (position == 'Q1' && !stimPriority) || (position == 'Q2' && !stimPriority)){ // Numbers
			if (response == 'left'){
				return ($.inArray(stimuli.charAt(1), ['2', '4', '6', '8']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(1), ['3', '5', '7', '9']) == -1) ? false : true
			}
		}
	}
}

function processResponse(i, stimuli, position, responseTime, response){
	validity = checkAnswer(stimuli, position, response)
	return {
		"trial" : i + 1,
		"stimuli" : stimuli,
		"position" : position,
		"responseTime" : responseTime,
		"response" : response,
		"validity" : validity,
		"stimPriority" : stimPriority
		}
}

/**
 * Slide Functions
 */

function nextSlide(){
	slideCounter++;	
	var curr = slideOrder[slideCounter - 1] 		// Current slide
	var next = slideOrder[slideCounter] 			// Select next slide
	console.log(next)
	if (curr == "switch-final" | curr == "dualtask-final"){
			disableSpacebar()
	} else if(next == 'trials'){					// Setup Trial
		$('.trials').show(0, function(){
		    $(this).trigger('isVisible')
			$('.' + curr).hide()
		});
	} else {										// Show next Slide
		$('.' + next).show()
		$('.' + curr).hide()
	}
}

/**
 * Block Functions
 */

function nextBlock(){
	disableSpacebar()
	curTrial = trialOrder[blockCounter]
    // console.log(blockCounter, curTrial)
	userData = newTapassData(curTrial[0], curTrial[1], getTrialUnit(curTrial))
	userData['data'] = []
	// Order in which the stimuli appear
	if (verticalMode && (curTrial[2])){ // Clock Mode, Vertical
		GlobalQset = ['Q2','Q4','Q3','Q1']
	} else if (curTrial[2]){ // Clock Mode, Horizontal
		GlobalQset = ['Q1','Q2','Q4','Q3']
	} else { // Mirror mode
        GlobalQset = [[["Q1","Q2"],["Q4","Q3"]],[["Q2","Q4"],["Q3","Q1"]]][~~(verticalMode)][~~(curTrial[4])]; 
	}
	setupAidModule(curTrial)
	setTimeout(function(){
		$('#' + GlobalQset[0] + ' > span').show().html('+')
		setTimeout(function(){
			nextTrial(0)
			}, focusTime)
		}, newTrialTime)    	
}

function setupAidModule(current){
	$('.aid-task-hints').hide();
	// setupTaskAid() // Comment out to turn off Task Aid
	if (current[5]){
		$('#hints-keys').hide();
		$('.aid-keys').hide();
	} else {
		$('#hints-keys').show();
		$('.aid-keys').show();
		if (current[0] || current[2]){
			$('#aid-keys-left').html('Medeklinker/Even')
			$('#aid-keys-right').html('Klinker/Oneven')
		} else {
			var aidText = (current[4]) ? ['Even','Oneven'] : ['Medeklinker','Klinker'];
			$('#aid-keys-left').html(aidText[0])
			$('#aid-keys-right').html(aidText[1])
		}
	}
}

function setupTaskAid(){
	if (verticalMode){
		$('.aid-task').removeClass('aid-vertical');
		$('#aid-task-left').html('Cijfer Taak')
		$('#aid-task-right').html('Letter Taak')
	} else {
		$('.aid-task').addClass('aid-vertical');
		$('#aid-task-left').html('Letter Taak')
		$('#aid-task-right').html('Cijfer Taak')
	}
}

function populateScore(){
    rt = 0
	val = 0
    sval = 0
	for (var i = 0; i < userData['data'].length; i++) {
        if (userData['data'][i]['stimPriority']){
			rt = rt + userData['data'][i]['responseTime']
        	if (userData['data'][i]['validity']){ val++ }
        } else {
			if (userData['data'][i]['validity']){ sval++ }
		}
	}
	if (trialOrder[blockCounter - 1][0]){
        mrt = rt/(userData['data'].length/2)
        mval = val/(userData['data'].length/2) * 100
        msval = sval/(userData['data'].length/2) * 100
        $('.' + slideOrder[slideCounter] + ' .validityPracticeResultDual').html(msval.toFixed(0))
    } else {
        mrt = rt/userData['data'].length
        mval = val/userData['data'].length * 100
    }
    if (mval > 97) { msg = speedAdvice } 
    else if (mval > 93) { msg = correctAdvice } 
    else { msg = accuracyAdvice }
    $('.' + slideOrder[slideCounter] + ' .validityPracticeResult').html(mval.toFixed(0))
    $('.' + slideOrder[slideCounter] + ' .responseTimePracticeResult').html(mrt.toFixed(0))
    $('.' + slideOrder[slideCounter] + ' .advicePracticeResult').html(msg)
}

function completeBlock(){
    blockCounter++;
    console.dir(userData) // This is the point where the JSON data should be sent to Neurotest servers
    nextSlide()
    populateScore()
	enableSpacebar()
	$('#notice').html('')
	$('td[id*="Q"] > span').hide()
	$('.aid-keys').hide()
}

/**
 * Trial Functions
 */

function nextTrial(i){
    stimuli = alphanumeric[session][trialCounter]
    position = GlobalQset[i % GlobalQset.length]
    $('#' + position + ' > span').show().html(stimuli)
    start = new Date().getTime() // get unix-timestamp in milliseconds
    trialCounter++
    console.log(trialCounter, i, stimuli, position)
    stimPriority = true;
    getResponse(i, stimuli, position)
}

function getResponse(i, stimuli, position){
	if (trialOrder[blockCounter][0]){
		tid = setTimeout(
	    	function(){
	    		userData['data'].push(processResponse(i, stimuli, position, stimuliTimeOut, null, stimPriority));
				$(document.body).unbind('keydown')
				if (stimPriority){
					responseFeedback(i)
					stimPriority = false
					getResponse(i, stimuli, position)
				} else {
					i++
					if (i == trialOrder[blockCounter][6]){
						completeBlock()
					} else {
						responseFeedback(i)
					}
				}
			}, stimuliTimeOut)
		$(document.body).attr('tabIndex', 1).bind('keydown', function(event) {
		  	if (event.keyCode == '188') { // , | right
		    	event.preventDefault()
	    		responseTime = new Date().getTime() - start
				userData['data'].push
(					processResponse(i, stimuli, position, responseTime, 'right')
				);
				clearTimeout(tid)
				$(document.body).unbind('keydown')
				if (stimPriority){
					responseFeedback(i)
					stimPriority = false
					getResponse(i, stimuli, position)
				} else {
					i++
					if (i == trialOrder[blockCounter][6]){
						completeBlock()
					} else{
						responseFeedback(i)
					}
				}
		   	} else if (event.keyCode == '88') { // x | left
		    	event.preventDefault();
	    		responseTime = new Date().getTime() - start
	    		userData['data'].push(
					processResponse(i, stimuli, position, responseTime, 'left')
				)
				clearTimeout(tid)
				$(document.body).unbind('keydown')
				if (stimPriority){
					responseFeedback(i)
					stimPriority = false
					getResponse(i, stimuli, position)
				} else {
					i++
					if (i == trialOrder[blockCounter][6]){
						completeBlock()
					} else{
						responseFeedback(i)
					}
				}
		    } 
		})
	} else {
	    tid = setTimeout(
	    	function(){
	    		userData['data'].push(processResponse(i, stimuli, position, stimuliTimeOut, null));
				$(document.body).unbind('keydown')
				i++
				if (i == trialOrder[blockCounter][6]){
					completeBlock()
				} else {
					responseFeedback(i)
				}
			}, stimuliTimeOut)
	    $(document.body).attr('tabIndex', 1).bind('keydown', function(event) {
		  	if (event.keyCode == '188') { // , | right
		    	event.preventDefault()
	    		responseTime = new Date().getTime() - start
				userData['data'].push(
					processResponse(i, stimuli, position, responseTime, 'right')
				);
				clearTimeout(tid)
				$(document.body).unbind('keydown')
				i++
				if (i == trialOrder[blockCounter][6]){
					completeBlock()
				} else{
					responseFeedback(i)
				}
		   	} else if (event.keyCode == '88') { // x | left
		    	event.preventDefault();
	    		responseTime = new Date().getTime() - start
	    		userData['data'].push(
					processResponse(i, stimuli, position, responseTime, 'left')
				)
				clearTimeout(tid)
				$(document.body).unbind('keydown')
				i++
				if (i == trialOrder[blockCounter][6]){
					completeBlock()
				} else {
					responseFeedback(i)
				}
		    } 
		})
	}
}



function slideInterval(i){
    $('td[id*="Q"] > span').hide()
    $('#notice').html('')
    setTimeout(function(){  
        nextTrial(i)
        }, StimuliIntervalBaseTime)
}

function correctSlideInterval(i){
    setTimeout(function(){
        $('td[id*="Q"] > span').hide()
        $('#notice').html('')
        setTimeout(function(){  
            nextTrial(i)
            }, trueStimuliIntervalBaseTime)
    }, trueTrialTime)
}

function incorrectSlideInterval(i){
    setTimeout(function(){
        $('td[id*="Q"] > span').hide()
        $('#notice').html('')
        setTimeout(function(){  
            nextTrial(i)
            }, falseStimuliIntervalBaseTime)
    }, falseTrialTime)
}

function responseFeedback(i){
    if (trialOrder[blockCounter][0]){
        if ($('.aid-keys').is(":visible") && userData['data'][userData['data'].length-1]['validity']){
            if (stimPriority){ 
                $('#notice').html(correctResponse).css('color','green') 
            } else { 
                $('#notice').append('<span> / </span><span style="color:green">' + correctResponse + '</span>') 
                correctSlideInterval(i)
            }
        } else if ($('.aid-keys').is(":visible")){
            if (stimPriority){
                $('#notice').html(incorrectResponse).css('color','red') 
            } else { 
                $('#notice').append('<span> / </span><span style="color:red">' + incorrectResponse + '</span>')
            incorrectSlideInterval(i)
            }
        } else if (!userData['data'][userData['data'].length-1]['validity']){
            if (stimPriority){
                $('#notice').html(incorrectResponse).css('color','red')
            } else { 
                $('#notice').append('<span> / </span><span style="color:red">' + incorrectResponse + '</span>')
            incorrectSlideInterval(i)
            }
        } else {
            if (stimPriority){} else {slideInterval(i)}
        }
    } else {
        if ($('.aid-keys').is(":visible") && userData['data'][userData['data'].length-1]['validity']) { 
            $('#notice').html(correctResponse).css('color','green')
               correctSlideInterval(i)
        } else if (!userData['data'][userData['data'].length-1]['validity']){ 
            $('#notice').html(incorrectResponse).css('color','red')
               incorrectSlideInterval(i)
        } else { 
            slideInterval(i)
        }
    }
}

/**
 * Utility Functions
 */

function getRandom(){
	return Math.round(Math.random())
}

/**
 * Init Functions
 */

function initSlides(){ 								// Setup slides in accordance with session parameters
	enableSpacebar()
	dualTaskMode = session % 2 ? false : true
	sessionSet = alphanumeric[session]
	unitLength = dualTaskMode ? 6 : 5
	for (var i = 0; i < unitLength; i++) {
		curSet = slides[i]
		if (curSet[0] instanceof Array){
			first = getRandom()
			second = first ? 0 : 1
			firstUnitPair = curSet[first]
			for (var j = 0; j < firstUnitPair.length; j++) {
				if (firstUnitPair[j] instanceof Array){
					slideOrder.push(firstUnitPair[j][~~(verticalMode)])
				} else {
					slideOrder.push(firstUnitPair[j])
				}
			};
			secondUnitPair = curSet[second];
			for (var j = 0; j < secondUnitPair.length; j++) {
				if (secondUnitPair[j] instanceof Array){
					slideOrder.push(secondUnitPair[j][~~(verticalMode)])
				} else {
					slideOrder.push(secondUnitPair[j])
				}
			};
		} else {
			for (var k = 0; k < curSet.length; k++) {
				if (curSet[k] instanceof Array){
					slideOrder.push(curSet[k][~~(verticalMode)])
				} else {
					slideOrder.push(curSet[k])
				}
			}
		}
	}
	insertSlide()
}

function insertSlide(){			// Insert custom slides that do not fit logically into the slide structure
	var emptySlides = 0;
	for(var i=0; i<slideOrder.length; i++){ // empty slide hack, force linear progression of slides for current unit
    	if(slideOrder[i] == "empty-slide-hack"){
    	emptySlides++
	    }       
	}
	for (var i = 0; i < emptySlides; i++) {
		var index = slideOrder.indexOf('empty-slide-hack'); 
		slideOrder.splice(index, 1)
	}
	slideOrder.splice(19, 0, "switch-intermezzo")
	slideOrder.splice(23, 0, "switch-practice-both-1-results")
	slideOrder.splice(26, 0, "switch-practice-both-2-results")
	if (!dualTaskMode){
		slideOrder.push("switch-final") 			// Non-Dual-Task Final Slide
	} else {
		slideOrder.splice(46, 0, "switch-end")
		slideOrder.splice(59, 0, "dual-real-1-results")
		slideOrder.splice(60, 0, "dual-intermezzo")
		slideOrder.splice(73, 0, "dual-real-2-results")
		slideOrder.push("dualtask-final") 			// Dual-Task Final Slide
	}
	initTrials()
}

function initTrials(){ 					// Setup trials in accordance with session parameters
	for (var i = 0; i < slideOrder.length; i++) {
		slideOrder[i]
		for (var key in trialBlocks) {
			if (trialBlocks.hasOwnProperty(key)) {
				if (key == slideOrder[i]){
		 			for (var j = 0; j < trialBlocks[key].length; j++) {
		 				trialOrder.push(trialBlocks[key][j])
		 			}
				}
	  		}
		}
	}
	removeSlide()
}
function removeSlide(){ // Remove slides which merely functioned to inform the initTrials() function.
	var index = slideOrder.indexOf('switch-practice-both-numbers-instructions')
	slideOrder.splice(index, 1)
	index = slideOrder.indexOf('switch-practice-both-letters-instructions')
	slideOrder.splice(index, 1)
}

(function() {

// Check and load query parameters or show configuration options
	if ($.urlParam('testsubject') && $.urlParam('instructions') && $.urlParam('session')){
		userID = $.urlParam('testsubject')
		verticalMode = ($.urlParam('instructions') == 'vertical') ? true : false
		session = $.urlParam('session')
	 	initSlides()
	 	$('.' + slides[0][0]).show() // Activate first slide
	// Dual Task Test Settings 
	 	// $('.' + slides[0][45]).show() // Activate first slide
	 	// slideCounter = 45
	 	// trialCounter = 320
	 	// blockCounter = 12
	} else {
		$('.start').show() // Activate configuration slide
		$('#setMode').click(function(){ 
			verticalMode = $('#verticalMode').is(':checked')
			session = $('input[name=session]:checked').val()
			$('.start').hide()
			initSlides()
			nextSlide()
		})
	}
	$('.trials').bind('isVisible', nextBlock)
})()
