
function chunkArrayInGroups(arr, size) {
  //iterate through array.length
  var i = 0;
  var a = 0;
  var arr2 = [];

  while (i <= arr.length) {
    //push
     arr2.push(arr.slice(a, size));
     i++;
     a += size;
  }
 return arr2;
}



chunkArrayInGroups(["a", "b", "c", "d"], 2);
