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
var alphanumeric = [['B9', 'F2', 'd6', 'e4', 'd7', 'R4', 't2', 'A8', 'R9', 'B2', 'R7', 'd3', 'h2', 't9', 'h8', 'R2', 'h4', 'e6', 'B4', 'F6', 'R8', 'h2', 'R9', 'F3', 'd8', 't4', 'B7', 't9', 'A3', 'h6', 'd4', 'e8', 'h9', 'A2', 'd7', 'R8', 'B2', 't7', 'e4', 'R8', 'h4', 'B3', 'd1', 'B6', 'A7', 'd6', 'B2', 'e8', 'B7', 'e9', 'R2', 'h9', 'e3', 't7', 'F1', 'R7', 'A8', 'e4', 't7', 'F3', 'e1', 'R7', 'A3', 'h9', 'd4', 'e7', 't9', 'A8', 'B4', 't7', 'h6', 'R2', 'd3', 'R9', 'B4', 't2', 'h7', 'A2', 'B6', 'F8', 'B1', 't9', 'd8', 'R4', 'A9', 'R3', 'F4', 'h9', 'e1', 'A2', 'F4', 't9', 'A1', 'd9', 'e4', 'A7', 'R9', 'A2', 'B7', 'd3', 'R4', 't2', 'A4', 'e7', 'd1', 'h9', 'A4', 'h8', 'A9', 'e2', 'B3', 'h2', 't3', 'B6', 'e8', 'd4', 'B8', 'F7', 'e3', 'R4', 'A6', 't9', 'B4', 'h3', 'F1', 'd7', 'B8', 'R7', 'F3', 'd8', 'F2', 'R1', 'e4', 'R7', 'F2', 'A3', 'B2', 't8', 'h2', 'B8', 'F6', 't9', 'd4', 't3', 'A2', 'F8', 'h2', 'B6', 'R7', 'B3', 'F6', 'e2', 't7', 'h6', 'A9', 'd1', 't3', 'd1', 't8', 'R2', 't6', 'h3', 'F2', 'h8', 'd7', 'R9', 't8', 'e2', 'B1', 'R6', 'B9', 't1', 'B9', 'A7', 'e6', 'B2', 'R4', 'B2', 'A9', 'd3', 'F7', 'B3', 'h8', 'B4', 'd8', 'F7', 'A3', 'h4', 't1', 'A8', 'd4', 'A1', 't4', 'F9', 'd7', 'e3', 'B9', 'F2', 'B9', 'd2', 't8', 'R7', 'e6', 't4', 'e1', 'A8', 'B7', 'R3', 'e2', 't6', 'R9', 'e8', 'B3', 't7', 'R8', 'F7', 'B2', 'e3', 'A1', 'd9', 'h7', 'd3', 'e2', 'A7', 'R2', 'F9', 'd4', 'F2', 'B1', 'F9', 'e7', 'R2', 'h8', 'd1', 'F3', 'B7', 'e8', 'R4', 't6', 'e2', 'F8', 'h6', 'A2', 't1', 'F4', 'h7', 'd8', 'h9', 'R1', 'e7', 't6', 'e4', 't9', 'R1', 'A8', 'd3', 'h6', 'R4', 't8', 'd3', 'F8', 'e2', 't1', 'd4', 'A6', 'B2', 'F7', 'd4', 't7', 'A4', 'e2', 't3', 'd8', 'A4', 'B9', 'F1', 'A2', 't8', 'd2', 'h6', 't8', 'A3', 'e1', 't3', 'e7', 'A2', 'F4', 'd9', 'h8', 'd4', 'e8', 'B4', 'd7', 't4', 'h2', 'A6', 't3', 'R9', 'd3', 'h7', 'd4', 'R7', 'A6', 'h2', 'd9', 'R2', 'h9', 'A8', 'd9', 't1', 'F9', 't4', 'F7', 'R2', 'B1', 'h4', 'A1', 'd6', 'A8', 't3', 'R6', 'A7', 'F6', 't1', 'd2', 't7', 'e4', 'A6', 'd3', 'h6', 'R8', 'e7', 'd8', 't4', 'F1', 'A8', 'h2', 'B7', 'A8', 'd4', 'h7', 'e6', 'F2', 'd9', 'e2', 'd1', 'e7', 'A1', 'R2', 'd9', 'h6', 'e2', 'B7', 'd9', 'B2', 'h4', 'R2', 'A7', 'R9', 'e4', 'h3', 'd8', 'A9', 'B6', 'A1', 'e9', 't1', 'e9', 'F6', 'B1', 'A8', 'h4', 'F1', 'R9', 'B1', 't4', 'd2', 'F9', 'h1', 'd3', 'F7', 'e1', 'F8', 'B1', 'A7', 'h3', 'd1', 'e4', 't9', 'R7', 'A2', 'h3', 'B6', 'R3', 'e9', 'h3', 'R8', 'e4', 't7', 'B2', 't4', 'e1', 'B8', 'A4', 'F1', 'h7', 't6', 'd4', 'A7', 'R9', 'B4', 'e8', 'd9', 'h8', 'F4', 'e7', 'd9', 'A2', 'F6', 'R9', 'd3', 'e7', 't8', 'B6', 't2', 'R9', 'd7', 'F4', 'A7', 'd6', 't9', 'R4', 'B7', 'e3', 'B4', 'F3', 'R4', 'h6', 'B8', 'A4', 'F3', 't4', 'R7', 'F2', 'h9', 'd1', 't6', 'A8', 'h2', 'd3', 'h7', 'F8', 'B7', 'h4', 'd9', 'F4', 'B1', 'F6', 'A8', 'e3', 'F2', 'd6', 'A3', 'e8'],
                    ['h8', 'A6', 'R2', 'd9', 'B2', 'e6', 'h1', 'd8', 't9', 'F3', 't9', 'R3', 'F6', 'A3', 'h2', 'd4', 'F7', 'A1', 'R8', 'd3', 'R2', 't9', 'F6', 't2', 'd8', 'B4', 'F8', 'e6', 'd2', 'B1', 'd7', 'A4', 'e8', 'h9', 't4', 'F7', 'd8', 'h3', 'e9', 'A3', 'F4', 'R2', 'A7', 'd3', 'R1', 'd4', 'B8', 'F7', 'e3', 'h9', 'B7', 'e2', 'A9', 'h7', 'B1', 'h7', 'd6', 'B9', 'd4', 'h2', 'A6', 'h3', 'e9', 'B2', 'A6', 't9', 'h7', 't1', 'A3', 'F6', 'd1', 'e8', 'd2', 'B7', 'R4', 'e9', 't8', 'F7', 'A6', 'd1', 'A2', 'F4', 'A2', 'e6', 'd4', 'h1', 't6', 'F7', 'A8', 't2', 'A3', 't2', 'F3', 'h6', 'd4', 'R8', 't4', 'A3', 'h1', 'R8', 'B9', 'R8', 'd7', 't1', 'd4', 'A9', 'd6', 'A7', 'e9', 'A3', 'R6', 'F1', 'h8', 't3', 'e2', 'F9', 'B3', 'A1', 'e4', 'B8', 'F7', 'A4', 'h9', 'F3', 'A8', 'F4', 't3', 'd8', 'e2', 'F8', 'A1', 'd6', 'A3', 'e9', 'A4', 'F2', 'A4', 'h9', 'e6', 'B4', 't2', 'e4', 'R8', 'h1', 'A8', 'R6', 't7', 'B4', 'd3', 'F9', 'd4', 'F8', 'e7', 't3', 'F2', 'A6', 'F7', 't4', 'B6', 'h7', 'F3', 'e1', 'R3', 't7', 'e2', 'R6', 'h7', 'e9', 'R1', 't8', 'F2', 'A3', 'B2', 't6', 'h9', 'd2', 'F3', 'B6', 't8', 'd3', 'R7', 'h8', 't1', 'R4', 'B2', 'e9', 'F3', 'B8', 'h1', 't8', 'B1', 't9', 'R7', 't9', 'h7', 'F1', 'e3', 'h2', 'B8', 'F7', 'B9', 'h1', 'd3', 'B8', 'F2', 'R3', 'F7', 'h1', 'd7', 'R2', 'e4', 'd2', 'F9', 't6', 'R4', 'h2', 'F1', 'h7', 'R4', 'e7', 'd3', 'A1', 't6', 'B7', 'R8', 't4', 'e3', 't9', 'h6', 'A7', 'h1', 'A2', 'd8', 'F3', 'e6', 'd8', 'A9', 'd2', 'F1', 'R7', 'B1', 'h2', 'A4', 'd8', 'e6', 't8', 'B4', 'e7', 'h4', 'B7', 'F1', 'h4', 'A1', 'R9', 'e7', 'h4', 'A8', 'F3', 'e8', 'B2', 'd6', 'e8', 'd2', 'A9', 'R3', 'B6', 'A9', 'e2', 't1', 'B3', 'A4', 'e8', 'F7', 'R9', 't7', 'B2', 'h9', 'A1', 'R3', 'd1', 'h3', 'R8', 'h2', 'd7', 'e8', 'A2', 'R3', 'd2', 'h3', 'A7', 'R3', 'F6', 't9', 'd4', 'A2', 'd8', 'B6', 'e9', 'd7', 'R3', 't9', 'h3', 'd4', 'R6', 'h8', 'd9', 'A6', 'h4', 'e7', 't1', 'A6', 'B8', 'h2', 'B3', 'F4', 'h9', 'd1', 't9', 'F3', 't7', 'B9', 't2', 'e6', 'F9', 'B7', 't2', 'h4', 'A8', 'R9', 'B7', 'h2', 't4', 'h2', 'A7', 'B9', 'R4', 'e2', 'F7', 'h2', 'B7', 'h6', 'A8', 't4', 'e2', 'h3', 'B7', 'R1', 'd9', 't8', 'A7', 't9', 'A2', 'h3', 'd8', 'h4', 'R6', 'F3', 'e2', 'F1', 'h9', 'e8', 'F7', 'B1', 't9', 'A6', 'e2', 'B9', 'F6', 'R9', 'd2', 'B9', 'R4', 'F9', 'e3', 'A1', 't4', 'F3', 't6', 'F3', 'B2', 'A7', 't4', 'e2', 'F1', 'R4', 'A9', 't6', 'A1', 't9', 'h2', 'R8', 'd4', 'F6', 'h4', 'R2', 'F3', 'h4', 'A7', 'h6', 'R8', 'A1', 'h8', 'A2', 'd7', 'R6', 'e3', 'h6', 'd1', 't8', 'A7', 't8', 'd4', 'h1', 'R7', 'B1', 'F2', 'B3', 'e7', 'd3', 'F8', 't7', 'd6', 'F7', 'd3', 'A1', 'e2', 'h7', 'A6', 'R3', 'e8', 't4', 'F1', 'A3', 'h6', 'e9', 'd8', 't2', 'R9', 'd7', 'B9', 't6', 'h3', 'e2', 'A7', 'R1', 'h9', 't1', 'h4', 't7', 'R4', 'F2', 'B3', 'h8', 'F3', 'R4', 'B6', 'R7', 't1', 'B8', 'h2', 'F8', 'd3', 't2', 'h7'],
                    ['e2', 't9', 'h7', 'A9', 'R2', 'd9', 'h4', 'F1', 'd9', 'A1', 'R3', 't6', 'R1', 'A6', 't4', 'B1', 'F2', 'e7', 'B3', 'h7', 'A8', 'F2', 'B6', 'd1', 'F6', 'h8', 'e1', 'B3', 'd8', 'F2', 'B9', 'e6', 't2', 'F3', 'h9', 'R1', 'e3', 'F1', 'B3', 't9', 'e8', 'F3', 'd9', 'A3', 'R2', 'd9', 'h7', 'A1', 't6', 'A4', 'h7', 'F3', 'R9', 'h2', 'e8', 'R4', 'F1', 'h7', 'A9', 'R1', 'e6', 'd4', 'B2', 'R9', 'A7', 'e1', 'R4', 'e3', 'd2', 'F6', 'R4', 'F7', 'R8', 't2', 'h9', 'e6', 'h7', 'B4', 'F9', 't2', 'd4', 'h3', 'e4', 'A7', 'F6', 'd2', 't7', 'F1', 'A3', 'd7', 'B8', 'd6', 'F9', 'e3', 't4', 'R1', 'B3', 'A7', 'h2', 'A6', 'F7', 'R9', 'h8', 'R4', 'F6', 't3', 'd8', 't2', 'B9', 'd3', 'A6', 'R2', 'B4', 'e2', 't3', 'R7', 'F6', 'A7', 'F1', 'd4', 'B1', 'R8', 'e6', 'A4', 'h7', 'B3', 'R4', 'd1', 'A7', 'R3', 't2', 'F4', 'h2', 'A8', 'R4', 'B8', 'A3', 't2', 'e3', 'R6', 'e9', 'd6', 't8', 'R4', 'e3', 't8', 'h7', 'F8', 'A6', 'e4', 'R1', 'F2', 'e8', 'F4', 'B8', 'R3', 't7', 'd3', 'B4', 'R7', 'B9', 'e3', 'h2', 'B1', 'R3', 'A7', 'd2', 'F6', 'A9', 'B8', 'd7', 'h2', 'B4', 'F6', 't3', 'e4', 'h3', 'B7', 'e9', 't7', 'h9', 'A2', 'R8', 't1', 'e4', 'B3', 'F4', 'R6', 'e2', 'd8', 'e9', 'A3', 'R4', 'd7', 'e9', 'd4', 'e6', 'A1', 'd3', 'B4', 'R9', 'F8', 'B7', 'e4', 'h3', 'A4', 'e1', 'F8', 'B6', 'h8', 'B6', 'e4', 'd8', 'F9', 'e1', 'A9', 'F2', 'R1', 'F2', 'd9', 'e8', 'A6', 'd1', 'h2', 'B4', 'F7', 'R8', 'h2', 't8', 'B3', 't1', 'B4', 'e8', 'A2', 't1', 'A3', 'F1', 'B7', 'h8', 'B2', 'e8', 'A3', 't8', 'B6', 'A3', 't8', 'R6', 'e8', 'd4', 'R6', 'h2', 'B4', 'd3', 'R6', 'A8', 'h4', 'A9', 't8', 'R1', 't9', 'A8', 't4', 'F8', 'B1', 'd9', 'R1', 'F8', 'h6', 'e2', 'h3', 'e8', 'A7', 'B3', 't4', 'A2', 'h7', 'R4', 'e6', 'd7', 'B3', 't1', 'd3', 'F7', 'A3', 't2', 'h3', 'R8', 'A2', 'e3', 't7', 'e6', 'B1', 'F3', 'h8', 'e1', 'F3', 'h1', 'F8', 'e7', 'h6', 'e1', 'F6', 'B4', 'A2', 't1', 'F8', 'R6', 'e7', 'F9', 't3', 'd7', 'e1', 'R2', 't7', 'B6', 'R8', 'F6', 'd1', 'A6', 'F4', 't8', 'F1', 'd7', 'R2', 'h4', 't1', 'B2', 'd8', 'A6', 'h7', 'A8', 'h1', 'd2', 'h8', 'R2', 'B9', 'd2', 'e8', 'R7', 'F9', 'A6', 't4', 'd2', 't4', 'd9', 'A8', 't9', 'A3', 'd2', 'R3', 't6', 'R2', 'h1', 'F3', 'R8', 'F4', 'B2', 'd1', 'B7', 't8', 'B9', 't3', 'B1', 'R7', 'h2', 'R4', 'F8', 'R6', 'A2', 'h7', 't6', 'h2', 'e1', 'F6', 'A3', 'h6', 'd8', 'e4', 'd6', 'B2', 'd4', 't8', 'A3', 'R9', 'B8', 'd1', 'e3', 'h8', 'e9', 'A4', 'd3', 'h1', 'A8', 'R6', 'B4', 'd2', 'h4', 'R9', 't6', 'h2', 'd7', 'R8', 'B6', 'e1', 'A7', 'd9', 't3', 'A8', 'd1', 't4', 'A3', 'd7', 'A8', 't6', 'e1', 'A2', 't3', 'F9', 'A1', 'F4', 'h2', 'R7', 'h8', 't2', 'A4', 'R8', 'A3', 'h2', 'B9', 't6', 'd3', 'h2', 'e1', 'A7', 'B2', 'h7', 't9', 'h3', 'F7', 'R8', 'B9', 'd2', 'B4', 'A3', 'h9', 'R2', 'F7', 'd8', 'e9', 'B4', 'e7', 'F8', 'd2', 't1', 'F7', 'R6', 't8', 'A4', 'F1', 'A3', 'e9', 'A1', 'F2', 'R1'],
                    ['B6', 'd3', 'F7', 'R8', 'A4', 'h8', 'e2', 'A3', 'e8', 'R2', 'e6', 'F3', 'd8', 'A3', 'e4', 'h2', 'F9', 'B4', 'F2', 'e6', 'F4', 'A6', 'F4', 'e6', 'd4', 'h6', 'B1', 'F9', 'R7', 't2', 'A7', 't1', 'A2', 'R3', 'F8', 'h3', 'F7', 'R2', 'F7', 't4', 'h6', 'B8', 'R1', 'e2', 'B8', 'R3', 'B1', 'h7', 'A9', 'B6', 'd4', 'B6', 'A1', 'B4', 'd1', 'F6', 'R1', 'A9', 'e8', 'h4', 'e3', 'B7', 'h3', 'd4', 'F7', 'h6', 'd3', 'R9', 'B8', 'R7', 'F4', 'h9', 'F4', 'R1', 'A7', 'e4', 'F8', 'd7', 'A8', 't4', 'F7', 'A8', 'F9', 'h2', 'B3', 'd6', 't8', 'h9', 'R3', 'd9', 'h8', 't1', 'h2', 'R7', 'F2', 't7', 'A8', 'F6', 'd2', 'B3', 'd6', 'A3', 'h8', 'B9', 'A6', 'd1', 't3', 'e2', 'd4', 'R6', 'd7', 'h4', 'd2', 'R6', 'e9', 'd3', 'F8', 'R9', 'd1', 'e7', 'F1', 'R7', 'h8', 'B1', 'F7', 'h6', 'R8', 'd3', 'F7', 't2', 'h7', 'A6', 'h8', 'R2', 'A1', 'e4', 'A3', 'h9', 'B8', 'h6', 'B2', 't9', 'd4', 'R9', 't6', 'F9', 'R6', 'd3', 'A2', 'F4', 'R8', 't3', 'h7', 'e8', 'h4', 'F9', 'B3', 'h9', 'e3', 't8', 'A6', 'R3', 'd7', 'B4', 'd2', 'B1', 'h6', 'F2', 'A3', 'B1', 'F4', 't8', 'R7', 'd6', 'h1', 'R3', 'F6', 't8', 'e9', 'A3', 't9', 'd8', 't7', 'B3', 'R1', 'A9', 't8', 'A1', 't2', 'F3', 'd8', 'F9', 'B6', 'h3', 'e1', 't4', 'h7', 'A9', 'h7', 'e1', 'R2', 'B9', 't4', 'R8', 'F6', 't9', 'F8', 'h1', 't3', 'R4', 'B9', 'd6', 'h8', 'd2', 'F6', 'd1', 'F7', 'd6', 'h4', 'R1', 't9', 'F2', 'd3', 'h9', 't6', 'A2', 'd1', 'e9', 'R7', 'B4', 'A3', 'h4', 't6', 'F8', 'h7', 'A3', 't4', 'A1', 'd8', 'B4', 'F9', 'A8', 'e7', 'd3', 'A4', 'B8', 'd2', 'F3', 'B1', 'A7', 'B2', 't7', 'h8', 'd6', 'h1', 'F9', 'e1', 't8', 'F6', 'A7', 'd4', 'e2', 'A9', 't6', 'h8', 'F1', 'R3', 'A1', 'F2', 'd7', 'A3', 'R9', 'h2', 'e3', 'A8', 'B4', 't9', 'B3', 'd4', 'e3', 't7', 'R9', 'h2', 'B1', 'F9', 'A7', 'h6', 'B2', 'R9', 'e6', 'A3', 'e1', 'F6', 'd8', 'R4', 'h9', 'A2', 'e1', 'd3', 'F7', 'e4', 'd8', 'h2', 'F8', 'R2', 'F7', 'd8', 'A3', 'F9', 'd4', 'e7', 't1', 'e2', 'R7', 'F3', 'R8', 'e4', 'A3', 'h8', 'B4', 'F2', 'B8', 'A1', 't6', 'R4', 't7', 'B4', 'A1', 'F2', 'h8', 't3', 'B9', 'd7', 'F3', 'B4', 'R6', 'd2', 'B4', 'e7', 'A8', 'e6', 'F3', 'h2', 'd7', 'B1', 'd9', 'h2', 'R7', 't9', 'h6', 'F8', 'd3', 'e8', 'd9', 'A1', 'h6', 'd3', 't7', 'R3', 'A8', 'h1', 'd7', 'h9', 'A8', 'h7', 'F1', 'B4', 'h8', 't6', 'F9', 'd3', 'e1', 'B2', 'A9', 'R4', 'd6', 'e1', 'B8', 'e4', 'A1', 'e6', 'A1', 't3', 'R7', 'h9', 'e7', 'F1', 'e8', 'B9', 'h3', 'd8', 't3', 'h4', 'R8', 'e4', 'A9', 'e2', 'F3', 'e1', 'F9', 'd1', 'A3', 'B2', 't9', 'e8', 'd2', 'R6', 'A2', 'e4', 't7', 'd9', 'B6', 't1', 'd4', 'e2', 'F7', 't6', 'R4', 'B1', 'h3', 'e1', 'F9', 'A7', 'R3', 'B6', 'h1', 'R3', 'F8', 'e4', 'R3', 'B2', 'A7', 'd9', 'e1', 'd4', 'A8', 'R3', 'B6', 'd9', 't4', 'h2', 'R9', 'e3', 'F2', 'h9', 'A3', 'B1', 'h3', 'e6', 'B7', 'R1', 't7', 'h2', 'd4', 'e9', 'F6', 'd8', 'e1', 't6', 'R8', 't4', 'F8', 'e1', 'A4']],
    stimuliSize = {
        'R' : 58,
        'B' : 58,
        'A' : 58,
        'F' : 58,
        'e' : 77,
        'd' : 60,
        'h' : 60,
        't' : 67,
    },
    sessionSet;


// Timers
var baseTime = new Date(),
	tid,
	start,
    newTrialTime = 0,
    focusTime = 0,
    stimuliTimeOut = 1000, // 1000
    StimuliIntervalBaseTime = 0,
    trueStimuliIntervalBaseTime = 50,
 	trueTrialTime = 50,
    falseStimuliIntervalBaseTime = 0,
    falseTrialTime = 0,
	newTrialTime = 1900, // 1900
	focusTime = 100,
	stimuliTimeOut = 5000, // 5000
	StimuliIntervalBaseTime = 200,
	trueStimuliIntervalBaseTime = 150,
	trueTrialTime = 50,
	falseStimuliIntervalBaseTime = 1000, // 1000
	falseTrialTime = 500; // 500

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
	    "switch-introduction"
        ],
	  1:[ // L1 Unit
	      [ // L2 Random Order
	    	["switch-practice-letters-instructions-1","switch-practice-letters-instructions-2"], // L3 VerticalMode
            "switch-practice-letters-instructions-example",
		    "switch-practice-letters-instructions-hint",
		    "switch-practice-letters-pre-practice-1",
		    "trials",
		    "switch-practice-letters-results-1",
		    "switch-practice-letters-pre-practice-2",
		    "trials",
		    "switch-practice-letters-results-2"],
		  [
    		["switch-practice-numbers-instructions-1","switch-practice-numbers-instructions-2"],
            "switch-practice-numbers-instructions-example",
		    "switch-practice-numbers-instructions-hint",
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
			$('#aid-keys-left').html('<b>V</b>: Kleine letter <br> Kleiner dan 5')
			$('#aid-keys-right').html('<b>N</b>: Hoofdletter <br> Groter dan 5 ')
		} else {
			var aidText = (current[4]) ? ['<b>V</b>: Kleiner dan 5','<b>N</b>: Groter dan 5'] : ['<b>V</b>: Kleine letter','<b>N</b>: Hoofdletter'];
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
    $('.' + slideOrder[slideCounter] + ' .validityAbsoluteResultDual').html(sval.toFixed(0))
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
        if (!trialOrder[blockCounter][5] && userData['data'][userData['data'].length-1]['validity']){
            if (stimPriority){ 
                $('#notice').html(correctResponse).css('color','green') 
            } else { 
                $('#notice').append('<span> / </span><span style="color:green">' + correctResponse + '</span>') 
                correctSlideInterval(i)
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
        if (!trialOrder[blockCounter][5] && userData['data'][userData['data'].length-1]['validity']) { 
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
	slideOrder.splice(20, 0, "switch-intermezzo")
	slideOrder.splice(24, 0, "switch-practice-both-1-results")
	slideOrder.splice(27, 0, "switch-practice-both-2-results")
	if (!dualTaskMode){
		slideOrder.push("switch-final") 			// Non-Dual-Task Final Slide
	} else {
		slideOrder.splice(47, 0, "switch-end")
		slideOrder.splice(60, 0, "dual-real-1-results")
		slideOrder.splice(61, 0, "dual-intermezzo")
		slideOrder.splice(74, 0, "dual-real-2-results")
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
	 	// $('.' + slides[0][0]).show() // Activate first slide
	// Dual Task Test Settings 
	 	$('.' + slides[0][46]).show() // Activate first slide
	 	slideCounter = 46
	 	trialCounter = 320
	 	blockCounter = 12
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
