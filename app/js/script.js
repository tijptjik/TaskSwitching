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
var alphanumeric = [['t9', 'd4', 'F8', 'R2', 'A4', 'h8', 'B6', 't8', 'd2', 'A9', 'h1', 'F8', 'd4', 'e8', 'R2', 'F6', 'B4', 'd6', 'h6', 'B8', 't8', 'B6', 'd4', 'A2', 'h8', 'F2', 'e8', 'h6', 'B6', 'd6', 'B1', 'R8', 'B6', 't4', 'h6', 'F2', 't8', 'R4', 'A6', 't9', 'A2', 'h6', 'R8', 'e4', 'd8', 'F2', 'R9', 'h6', 'e6', 'A8', 't6', 'd1', 'A8', 'h1', 'B4', 'F8', 't9', 'F2', 'e8', 'd1', 'B8', 'F2', 'e6', 'F4', 't6', 'F2', 'h1', 'R4', 'h6', 'B6', 'e4', 't8', 'R8', 'd6', 'F8', 'd4', 'h6', 'F8', 'e6', 'd8', 'h4', 'A8', 'F6', 'e4', 't9', 'F2', 'A8', 'F1', 'd9', 't1', 'h6', 'A4', 'd6', 'B8', 't1', 'd9', 't2', 'B9', 'R2', 'e9', 'A2', 'F8', 'A6', 'e8', 't2', 'R9', 'd6', 't9', 'B4', 't6', 'h2', 'A6', 'e2', 'F4', 'e9', 'F1', 'e6', 'A1', 'B9', 'e4', 'B1', 'e9', 'A1', 'e2', 'd8', 'R6', 'e9', 'A6', 'h4', 'd8', 'A6', 'R9', 'd2', 't4', 'e6', 'A9', 'e4', 'A6', 'B8', 't2', 'A1', 'h6', 'R6', 'e8', 'B1', 'R8', 'h2', 't4', 'R2', 'B8', 't6', 'F1', 't9', 'B2', 'R8', 'd8', 'h1', 'B4', 'A8', 'F2', 't8', 'B6', 'd1', 'A6', 'h9', 'A2', 'e1', 'F8', 'd2', 'A9', 'd6', 'A1', 'e8', 'R6', 'd1', 'R6', 'h4', 'F8', 't4', 'h9', 'd6', 'B9', 't6', 'h4', 'e6', 'R6', 'A8', 'B8', 'e1', 'd8', 'A1', 'B8', 'A2', 'h6', 't1', 'h2', 'A9', 'F2', 't9', 'F4', 't9', 'd6', 'F2', 'R6', 'h1', 'F8', 'R4', 'e9', 'h4', 'R6', 'A9', 'B1', 'd4', 't8', 'R6', 'A1', 'h6', 'e2', 'B8', 't4', 'F9', 'h8', 'e2', 'A9', 'e4', 'B8', 'A4', 't1', 'B8', 'F2', 'd6', 'h6', 'e6', 'B1', 'd8', 'e8', 'h4', 'R9', 'F8', 'R2', 'e9', 't4', 'F1', 'R9', 'h8', 't2', 'h8', 'A6', 'h9', 'e6', 'F6', 'R2', 'A8', 'd2', 'h6', 'A4', 'R6', 'e2', 'B8', 'F6', 'e9', 't6', 'e8', 'F4', 'R9', 'd1', 'h8', 'A6', 'R8', 'h9', 'F1', 't8', 'A8', 'F2', 'd6', 'h6', 'A6', 'd8', 'F4', 'R8', 'F1', 'h8', 'd2', 'B4', 'R8', 't1', 'd8', 'e8', 'B2', 'e9', 'A1', 'B6', 't8', 'B1', 'd9', 'h6', 'B4', 'e8', 'F1', 'B9', 't6', 'F6', 'd8', 'B8', 'R6', 't4', 'd9', 't8', 'F6', 'd8', 't1', 'R9', 'h8', 'e1', 'R8', 'F9', 'A4', 'd8', 'e2', 'A4', 'e9', 'F8', 't6', 'd2', 'B8', 'e6', 'F4', 'R6', 'B6', 'd8', 'R2', 'B9', 'd2', 't8', 'A6', 't2', 'e1', 'h8', 'B8', 'F4', 'd2', 'B6', 'F2', 'h6', 'A9', 'F2', 't1', 'R9', 't2', 'R8', 'A1', 'h8', 'A4', 't6', 'F6', 'A1', 'd4', 'B8', 'F1', 'h8', 'A2', 'd6', 'F4', 'h8', 'F1', 'd8', 't8', 'd1', 'A6', 'B2', 'F8', 'e4', 't9', 'B8', 'A2', 'd8', 'B2', 'F6', 'e4', 'F8', 'A2', 'F9', 't2', 'A8', 'h6', 'd6', 'h8', 'B6', 'A8', 'R1', 'h2', 'R8', 'F6', 'A8', 'h4', 'e6', 'B1', 'R9', 'e6', 'd6', 'A1', 'F6', 'A6', 't9', 'R4', 'h6', 'A2', 'B6', 'R8', 'd4', 'F8', 'd6', 'F8', 'd1', 'F8', 'R6', 'e8', 't4', 'F1', 'B8', 'R2', 't9', 'h2', 'B1', 't8', 'B8', 'e1', 'R9', 'h2', 'e8', 'R9', 'F8', 'd4', 'R8', 'd9', 'h8', 'R2', 'e8', 'B8', 'F1', 'h6', 'F2', 'A9', 'd4', 't8', 'A4', 't8', 'R1', 't4', 'R8', 'F6', 'd8', 'R4', 'h9', 'A2', 'h6', 'B9', 'e1', 'h8', 'e1', 'F6', 'R2', 'F8', 't2'],
                    ['F1', 'R2', 'A8', 'h1', 't6', 'R8', 't4', 'd8', 'h6', 'R1', 'h8', 'B1', 'd6', 'A4', 'h9', 'A8', 'R9', 'e6', 'R8', 'F2', 'h9', 'd6', 't9', 'B4', 'A8', 'd4', 'A9', 't4', 'A8', 't6', 'd4', 'h6', 'F8', 'B4', 'd6', 'F1', 'd9', 'e6', 'B8', 'A6', 'e8', 'R6', 'd6', 't1', 'd6', 'F8', 'd1', 'R6', 'e6', 'A2', 'h8', 'F8', 'R2', 'd8', 'e2', 'R6', 'd6', 'R6', 'F6', 't4', 'R8', 'e6', 'd4', 'e6', 'B4', 'd6', 'B4', 'h6', 't6', 'R9', 't6', 'B6', 't8', 'd6', 'h9', 'R8', 'B6', 'e1', 't6', 'F1', 'R9', 'h8', 'A4', 'e8', 'F1', 'R8', 'd2', 't4', 'A8', 't8', 'R4', 'e9', 'F8', 'd2', 'R4', 'A8', 'B2', 'h4', 'e1', 'R9', 'F4', 'h2', 'B9', 'A2', 'h4', 'R1', 'h8', 'A2', 'B8', 'd4', 'F1', 'h2', 'R8', 'F9', 'e1', 'R8', 'B8', 'R9', 'e1', 'd8', 'h2', 'F8', 'A6', 't8', 'd1', 'A4', 'h8', 'R4', 'd8', 'F9', 'R6', 'd9', 'R2', 'h8', 'R2', 'A6', 'R4', 'e6', 'F9', 'B1', 'd6', 'R1', 'e4', 'R6', 'd4', 'R2', 'd6', 'B6', 'e4', 'R6', 'A1', 'h2', 'F6', 'R8', 'B1', 'd4', 'R6', 'A9', 't2', 'h1', 'd8', 'A4', 'F6', 'h8', 'R1', 'h4', 't8', 'F2', 'B8', 'A1', 't4', 'B1', 'R9', 'B6', 'h2', 'A8', 'd4', 'e6', 'd8', 'F6', 'A2', 'e8', 'h2', 'A1', 'd8', 'A6', 'F1', 'h6', 'B2', 'd9', 'F4', 'A9', 'h6', 't4', 'F8', 'h1', 'e9', 't6', 'F9', 'B6', 'F8', 't4', 'e6', 'F8', 'e2', 't8', 'F9', 'h6', 't6', 'F8', 'h9', 'A6', 'd2', 'F8', 't6', 'A8', 'h6', 'e8', 'B2', 'R8', 'B6', 'e2', 'B4', 'F9', 'R1', 'h4', 'e6', 'A6', 'h9', 'B6', 'd9', 'R8', 'B4', 'h1', 't8', 'R9', 'B8', 'd4', 'R9', 'e6', 'A6', 'e8', 'd1', 'F6', 'e4', 'F9', 'A6', 'e6', 'R1', 'h8', 'R4', 'h8', 'e9', 'F8', 'd6', 'h1', 'R6', 'e8', 'B6', 'F9', 't8', 'A1', 'e9', 'h2', 'A1', 'B8', 'd6', 'h4', 'F6', 'A8', 'B4', 'h2', 'd1', 'B6', 'd2', 'e8', 'd6', 'R9', 't2', 'F9', 'h8', 'd8', 'F1', 'h9', 'A1', 'R9', 'B4', 'e2', 'A8', 'e6', 'R2', 't8', 'A1', 'e9', 'F6', 'e8', 'R6', 'F8', 'h6', 'F2', 'B8', 'R1', 'd6', 'F8', 'R6', 'h6', 'A4', 'B8', 't6', 'B2', 'e1', 'R8', 't6', 'e4', 'R9', 'h1', 't2', 'R6', 'B9', 'h6', 'e9', 'R1', 't8', 'R6', 'A6', 'h4', 'A8', 'B2', 'F9', 'd4', 't8', 'F2', 't6', 'F1', 'h8', 'd1', 'e2', 'F9', 'B6', 'R2', 'h6', 'R8', 'F1', 'R6', 'e6', 'A2', 'B6', 'A9', 't6', 'e9', 'B6', 'R4', 'e6', 'd6', 'A6', 'R1', 'e2', 'F8', 'e6', 'h1', 'd9', 'R8', 'B6', 'e2', 'd8', 'R9', 'h6', 'A1', 'd4', 'A6', 'h8', 'B1', 'd6', 'h9', 'A6', 't6', 'e8', 'R9', 'e6', 'R2', 'h9', 'e2', 'd8', 'B6', 't6', 'R1', 'B8', 'd9', 'B1', 't4', 'F6', 'A9', 'e6', 't6', 'e1', 'F6', 'd4', 'A8', 't8', 'A9', 'd1', 't6', 'd9', 'R2', 'F8', 'h6', 'd1', 'h8', 'F8', 't8', 'e6', 't8', 'F4', 'e8', 't4', 'd8', 'B1', 'd8', 't6', 'h8', 'F1', 't9', 'A6', 'R8', 'A2', 'e6', 'B2', 't4', 'h6', 'A6', 'B2', 'R1', 't6', 'B6', 'h2', 'F8', 'R8', 't4', 'd2', 'A9', 'F6', 'h2', 'F8', 'R6', 'A9', 'e2', 'F4', 'e9', 'R6', 'd9', 'h4', 't1', 'B6', 'e8', 't1', 'F6', 'A9', 't6', 'e9', 'F1', 't6', 'A2', 'd8', 't6'],
                    ['h9', 'B4', 'A8', 'h1', 'R9', 't6', 'e6', 't2', 'R8', 'd4', 'B1', 'F8', 'e8', 'F4', 'h6', 'e8', 'R4', 'e8', 'A6', 'F8', 'h4', 'B8', 'h9', 'e4', 'A6', 'e6', 'A9', 'd6', 'B2', 't6', 'F2', 'B8', 'e1', 'R4', 'B6', 'F9', 'e4', 'F9', 'h6', 'A6', 'h4', 'R9', 'd6', 'R9', 'h4', 'A2', 'F1', 'B9', 'h6', 't1', 'A8', 'F4', 't6', 'F6', 'h4', 'F6', 'e1', 'A9', 'B6', 'd8', 'e4', 'A2', 'F8', 'd4', 'h1', 'R2', 'e8', 'A6', 'R8', 'h1', 'd4', 'F8', 'A1', 'h9', 'R1', 'e9', 'B1', 'd9', 'B2', 'A9', 'R4', 'd6', 'B1', 'e9', 'A4', 'h6', 'B1', 'd8', 'F6', 'R9', 't2', 'd4', 't8', 'B4', 'R6', 't6', 'd8', 'h6', 'F8', 't6', 'h8', 'd4', 'A6', 'F9', 'A6', 'd9', 'R6', 'A8', 'e9', 'd2', 'A9', 't6', 'd4', 'B6', 'h6', 'A9', 'h6', 't2', 'e9', 'B8', 'e8', 'A4', 't6', 'B1', 't4', 'B8', 'd9', 'R4', 'd8', 'h4', 'd9', 'F4', 'B6', 'A9', 't4', 'F1', 'A9', 'h8', 'A2', 'h8', 'A1', 'B8', 'e4', 't8', 'F1', 'R8', 't4', 'h6', 'R6', 'A9', 'R2', 't9', 'R1', 'h4', 'F2', 't8', 'F4', 'e8', 'B8', 'd6', 't8', 'R2', 'A9', 'd6', 'R2', 'A8', 'R1', 't9', 'e4', 't6', 'F2', 'A9', 'h8', 'A6', 'd4', 'h8', 'B6', 'h4', 'd9', 'h8', 'F9', 'h4', 'B8', 'R6', 'd2', 'h8', 'R6', 't6', 'R8', 'e8', 't1', 'F8', 'd2', 'B8', 'R4', 't2', 'e8', 'F6', 'd8', 'R4', 'h2', 'd8', 'A1', 't9', 'F6', 'e6', 'F8', 'A6', 'F6', 'd2', 'e8', 'R8', 'B6', 'e4', 'h6', 'A1', 'e6', 'R2', 'h4', 'R8', 'e1', 'd6', 'F8', 'R8', 't4', 'R9', 'A8', 'F2', 'd4', 'h6', 'R1', 't8', 'h1', 'e4', 'R8', 'e1', 'h8', 'A9', 'R1', 'h6', 'd2', 'A8', 'e6', 'd4', 'e6', 'A9', 'F8', 't6', 'R6', 'F2', 'e6', 'R1', 't8', 'F4', 'R8', 't6', 'R6', 't4', 'e9', 'A4', 'F8', 'R4', 't8', 'R6', 'F9', 'e8', 'R4', 'd2', 'e8', 'B9', 'R8', 'd2', 'F8', 'h4', 'e8', 'R6', 't9', 'F1', 'A8', 'e8', 'A2', 'e9', 'A6', 'B6', 'R1', 'd9', 'B1', 'd4', 't8', 'B4', 'e6', 'R4', 'A2', 'B8', 'h1', 'd6', 'F8', 'A9', 'd4', 'e2', 't1', 'B9', 'R4', 'F1', 'h2', 'F8', 'h9', 'd6', 'h8', 'A1', 'R9', 'F8', 't2', 'B8', 'R4', 'e9', 't1', 'd6', 'B1', 'e8', 'd9', 'h4', 'A9', 'h1', 'e4', 'A6', 'h1', 'B8', 'h2', 'F8', 'A9', 'd6', 'B4', 'F2', 'A9', 'd6', 'A9', 't2', 'e6', 'R6', 't2', 'e8', 'R8', 'A2', 'h6', 'e1', 'A9', 'e4', 'd9', 'F6', 't8', 'B2', 'h9', 'F8', 'B1', 't8', 'd2', 'R1', 'd8', 'F8', 'A4', 't6', 'e8', 'A1', 'F9', 'd8', 'e1', 'B8', 'd2', 'e4', 'h2', 'A8', 'B2', 'e6', 'A6', 'F6', 'h9', 'B4', 'F8', 'R1', 't2', 'd8', 'R8', 'h2', 'R9', 'd6', 'R4', 't8', 'A1', 'h8', 'R6', 'e8', 'F4', 'A9', 'h2', 'd8', 'A8', 'h6', 'A2', 'F8', 'R1', 't8', 'B6', 'h8', 'e8', 'd2', 'F8', 't2', 'A1', 'R6', 'F8', 't1', 'R8', 'B1', 'h2', 'B6', 'R2', 't4', 'e8', 'B9', 'h4', 'e6', 'F1', 'A8', 'h6', 't6', 'e8', 'R9', 'F2', 'e8', 'R2', 'h9', 'R6', 'A6', 'R1', 'e2', 'd1', 'B6', 'A2', 'd8', 'h2', 'F8', 'R6', 'A8', 'd1', 'A6', 'R8', 'A1', 'h9', 'B2', 'd6', 'h8', 'd2', 'F9', 'R6', 'A8', 'e6', 'd2', 'F1', 'h8', 'A1', 'd9', 'e6', 'h2'],
                    ['d6', 't2', 'R8', 'B6', 'h8', 'e1', 'B4', 'A6', 't4', 'A2', 'h8', 'B8', 'R2', 't1', 'A6', 'B1', 'e8', 'F2', 'A9', 'h2', 't6', 'e4', 'F8', 'd2', 't9', 'R8', 'F9', 'h4', 'e8', 'B6', 'A6', 'e6', 'A1', 'h8', 'F2', 'd8', 't6', 'd2', 'F9', 'h1', 'd8', 'e8', 'A6', 'e9', 'B2', 'h4', 'e8', 'F8', 't4', 'R1', 'B8', 'F1', 'e8', 'F1', 'R4', 'F1', 'd8', 'R4', 'A8', 'e4', 'd6', 'A8', 'h6', 'd8', 'A8', 'F2', 'd8', 'B6', 'd2', 'e8', 'R1', 'e8', 'A8', 'F8', 't4', 'R6', 'h1', 't2', 'd8', 'R4', 'A6', 'F4', 'd8', 'B1', 'F9', 'R6', 't8', 'd2', 'R4', 'A8', 'd6', 'h1', 'F8', 'd2', 'R8', 'B6', 'R8', 'e2', 't8', 'F2', 'B8', 'd8', 't4', 'h8', 'R9', 'd8', 't4', 'e8', 'B6', 'F6', 'e8', 'd2', 't9', 'F8', 'A1', 't8', 'h6', 't6', 'F8', 't4', 'F6', 'B6', 'A4', 'e9', 'A1', 'F6', 'B9', 'e6', 'd8', 't6', 'F6', 'e6', 'B4', 'd8', 'F4', 'R6', 'B8', 'e4', 'F8', 't1', 'F8', 'h6', 'e8', 'B2', 'e6', 't4', 'B2', 't9', 'A2', 'e6', 'F2', 't9', 'h1', 'A8', 'R2', 'B9', 'e1', 'd6', 'A2', 'F6', 'B6', 'e4', 'B9', 'e6', 'R1', 'e8', 'B6', 'e8', 'h6', 't8', 'R6', 'e4', 'R2', 'F8', 'e1', 'd4', 'A8', 'R1', 'B2', 'e6', 'B1', 'A8', 'F1', 'h8', 'A1', 'e8', 'B6', 'e1', 'h6', 'A4', 'R8', 'F6', 'e1', 'A9', 'F1', 'A8', 'd4', 't9', 'F8', 'R2', 'h8', 'e6', 'B6', 't4', 'h8', 'F1', 'h9', 'B6', 'A9', 't8', 'F6', 'e8', 'B8', 't4', 'R8', 'd8', 'h4', 'e8', 'F6', 'B9', 'A4', 't1', 'A4', 'B8', 't1', 'B6', 't8', 'A6', 't4', 'B6', 'd9', 'e1', 'F6', 'e2', 't8', 'h2', 'R8', 'A6', 'e4', 'A9', 'h8', 'd2', 'B1', 't8', 'B8', 't2', 'e4', 't6', 'R8', 'A8', 'e2', 'B8', 'A6', 'h1', 'R6', 'e6', 't8', 'A4', 'R8', 'A6', 't4', 'e1', 'B8', 'e1', 't8', 'F2', 'B9', 'R4', 'd6', 'F1', 'e2', 'A1', 'R9', 'A1', 'd6', 't4', 'd6', 'R9', 'h1', 'e6', 'h8', 'F8', 'd2', 'A8', 'e8', 'A4', 'h9', 'A6', 'R9', 'B6', 'd2', 'R6', 'A8', 'h4', 'e9', 't2', 'F8', 'd4', 'B2', 'h6', 'R2', 'F6', 'd2', 'B8', 'A1', 'e8', 'd4', 'F1', 't9', 'R8', 'e2', 'd6', 'F8', 'h8', 'B6', 'e9', 'd2', 'A4', 'F8', 'h1', 't9', 'e8', 'B1', 't8', 'e6', 'd8', 'F4', 'e9', 'B8', 'h2', 'F4', 'e2', 'A8', 'e4', 'B6', 't9', 'B8', 'R2', 'h8', 'F2', 'A6', 'R1', 't8', 'h6', 'F1', 'R8', 'B6', 't6', 'A1', 't8', 'B9', 'F6', 'e2', 'd8', 'R1', 'A8', 't2', 'd4', 'e8', 'B1', 'F9', 't1', 'R8', 'h8', 't8', 'e6', 'R6', 't6', 'B6', 'e4', 't8', 'e4', 'R8', 'A8', 'F2', 'd1', 'R8', 't8', 'h6', 'F2', 'A6', 'B9', 'd4', 't2', 'e1', 'F6', 'A8', 'R6', 't8', 'F6', 'A8', 'B2', 'e9', 'd4', 'A9', 'h2', 't4', 'e8', 'R4', 'A9', 'B1', 'e4', 'B1', 'A6', 'h2', 'B8', 'e6', 'd6', 'A9', 'd6', 'B4', 't8', 'd1', 'h6', 'B8', 't8', 'h4', 'R8', 'A6', 'F9', 't1', 'F8', 'A6', 'e1', 'A6', 'h4', 'R6', 'A8', 'd6', 'e4', 'h8', 'A6', 'F8', 't6', 'B4', 'A6', 'F2', 'h1', 'A6', 'F8', 'e9', 'd6', 'R6', 'B8', 'A4', 'e1', 'R8', 'F6', 'e8', 'R4', 'F9', 't6', 'd4', 'B6', 'e8', 'R2', 'F6', 'h1', 'R6', 'A8', 'd2', 't6', 'F9', 'A4']],
    stimuliSize = {
        'R' : 26,
        'B' : 26,
        'A' : 26,
        'F' : 26,
        'e' : 35,
        'd' : 29,
        'h' : 29,
        't' : 31,
    },
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
				return ($.inArray(stimuli.charAt(1), ['1', '2', '3', '4']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(1), ['6', '7', '8', '9']) == -1) ? false : true
			}
		}
		else if ((position == 'Q2' && stimPriority) || (position == 'Q4' && stimPriority) || (position == 'Q1' && !stimPriority) || (position == 'Q3' && !stimPriority)){ // Letters
			if (response == 'left'){
				return ($.inArray(stimuli.charAt(0), ['e', 'd', 'h', 't']) == -1) ? false : true
			} else if (response == 'right'){
				return ($.inArray(stimuli.charAt(0), ['R', 'B', 'A', 'F']) == -1) ? false : true
			}
		}
	} else {
		if ((position == 'Q1' && stimPriority) || (position == 'Q2' && stimPriority) || (position == 'Q3' && !stimPriority) || (position == 'Q4' && !stimPriority)){ // Letters
			if (response == 'left'){
                return ($.inArray(stimuli.charAt(0), ['e', 'd', 'h', 't']) == -1) ? false : true
            } else if (response == 'right'){
                return ($.inArray(stimuli.charAt(0), ['R', 'B', 'A', 'F']) == -1) ? false : true
			}
		}
		else if ((position == 'Q3' && stimPriority) || (position == 'Q4' && stimPriority) || (position == 'Q1' && !stimPriority) || (position == 'Q2' && !stimPriority)){ // Numbers
            if (response == 'left'){
                return ($.inArray(stimuli.charAt(1), ['1', '2', '3', '4']) == -1) ? false : true
            } else if (response == 'right'){
                return ($.inArray(stimuli.charAt(1), ['6', '7', '8', '9']) == -1) ? false : true
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
	if (false){
		$('#hints-keys').hide();
		$('.aid-keys').hide();
	} else {
		$('#hints-keys').show();
		$('.aid-keys').show();
		if (current[0] || current[2]){
			$('#aid-keys-left').html('Kleine letter / Kleiner dan 5')
			$('#aid-keys-right').html('Hoofdletter / Groter dan 5 ')
		} else {
			var aidText = (current[4]) ? ['Kleiner dan 5','Groter dan 5'] : ['Kleine letter','Hoofdletter'];
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
    $('.' + slideOrder[slideCounter] + ' .validityAbsoluteResult').html(val.toFixed(0))
    $('.' + slideOrder[slideCounter] + ' .validityRelativeResult').html(mval.toFixed(0))
    $('.' + slideOrder[slideCounter] + ' .responseTimeResult').html(mrt.toFixed(0))
    $('.' + slideOrder[slideCounter] + ' .adviceResult').html(msg)
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
    console.log(stimuli)
    console.log(stimuli[0])
    console.log(stimuli[1])
    console.log(stimuliSize[stimuli[0]])
    $('#' + position + ' > span.char1').css("font-size", stimuliSize[stimuli[0]] + 'pt').show().html(stimuli[0])
    $('#' + position + ' > span.char2').show().html(stimuli[1])
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
		  	if (event.keyCode == '78') { // N | right
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
		   	} else if (event.keyCode == '86') { // V | left
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
		  	if (event.keyCode == '78') { // N | right
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
		   	} else if (event.keyCode == '86') { // V | left
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

function adjustStimuliSize(stim){

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
