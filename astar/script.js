$(document).ready(function () {
  var rows = 20;

  var movement = [];
  var visited = [];
  var distance = [];
  var names = [
    "oradea", // 380
    "zerind",// 374
    "arad", //366
    "sibiu", //253
    "fagaras", //178
    "timisoara", //329
    "rimnicu", //193
    "lugoj", // 244
    "mehadia", //241
    "dobreta", //242
    "craiova", //160
    "pitesti", //98
    "bucharest", //0
    "giurgiu", //77
    "urziceni",
    "vaslui",
    "lasi",
    "neamt",
    "hirsova",
    "eforie",
  ];
  var h = [
    380, 374, 366, 253, 178, 329, 193, 244, 241, 242, 160, 98, 0, 77, 80, 199, 226,
    234, 151, 161
  ];
  var stack = [];
  var start_index, end_index;

  var grid = [
    [0, 71, 0, 151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [71, 0, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 75, 0, 140, 0, 118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [151, 0, 140, 0, 99, 0, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 211, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 118, 0, 0, 0, 0, 111, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 80, 0, 0, 0, 0, 0, 0, 146, 97, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 111, 0, 0, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 70, 0, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 146, 0, 0, 120, 0, 138, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 97, 0, 0, 0, 138, 0, 101, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 211, 0, 0, 0, 0, 0, 0, 101, 0, 90, 85, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 0, 142, 0, 0, 98, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 92, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 92, 0, 87, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 86],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0],
  ];

  $("#search").on("click", function () {
    start_index = $.inArray($("#start").val(), names);
    end_index = $.inArray($("#end").val(), names);
    astar(start_index,0);
   
	  $(".table").remove();

	let div = "<table class='table table-striped w-100'><tr><th>SN</th><th>From</th><th>To</th><th>Value</th></tr>";
	$.each(movement, function( index, value ) {
		div+= "<tr><td>"+(index+1)+"</td><td>"+ names[value[0][0]]+"</td><td>"+names[value[0][1]]+"</td><td>"+value[0][2]+"</td></tr>";
	  });
	 
	  $(".table-holder").append(div);

  });

  function astar(start,pathLength, min) {
	let temp = pathLength,to;

  console.log(pathLength);  
    if (start == end_index) {
      return 1;
    } else {
      for (let i = 0; i < rows; i++) {
        if (grid[start][i] > 0 && $.inArray(start, visited) == -1) {
          temp = grid[start][i];
          console.log("h of :"+names[i]+" at i = "+i+" is "+ (grid[start][i] + h[i]+ pathLength)+" = "+pathLength+"+"+grid[start][i]+"+"+h[i] );
          stack.push([start, i, grid[start][i] + h[i]+ pathLength]);
		}
      }

	  var values = $.map(stack, function(row) {
		return row[2];
	  });

	  min = Math.min.apply(null, values);

	  var min_row = $.grep(stack, function(row, index) {
		return row[2] == min;
	  });
	  
    console.log("");
    console.log("");
	  
  console.table(stack); 
	if(grid[start][min_row[0][1]] == 0 && start != start_index){
		temp = movement[movement.length - 1];
		console.log("path deleted:"+distance[distance.length - 1]);
		to = temp[0][0];
		pathLength -= distance.pop();

	}else{
		console.log("path added:"+grid[start][min_row[0][1]]+" to path "+pathLength);
   
		distance.push(parseInt(grid[start][min_row[0][1]]));

		pathLength += parseInt(grid[start][min_row[0][1]]);
    // pathLength = 0;
    //  $.each(distance, function(index, value) {
    //   pathLength += value;
      // console.log('adding:'+value);
    // });
		to = min_row[0][1];
		visited.push(start);
	}
	  
	  // console.log("path:"+pathLength);
	  console.log("min:"+min);

	  movement.push(min_row);

	  var filtered = $.grep(stack, function(elem, index) {
		return !(elem.join() == min_row.join());
	  });

	  console.log("moved from : "+names[start]+" to "+names[to]);
	  // console.log(filtered);
	  stack = filtered;
	  console.log('called next: ' +to+" "+pathLength+" "+min);
      return astar(to,pathLength, min);
    }
  }
});
