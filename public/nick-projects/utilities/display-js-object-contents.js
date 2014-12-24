
//displays the contents of a javasvsript object
var _MAX_DUMP_DEPTH = 10;
  function dumpObj(obj, name, indent, depth, $elm){
    var turnOff = false; //stop the dump function from working
    if (!turnOff) {
        if (depth > _MAX_DUMP_DEPTH) {
            return indent + name + ": <Maximum Depth Reached>\n";
        }
        if (typeof obj == "object") {
            var child = null;
            var output = '<pre>' + indent + name + "<pre>";//pre on each line necessary for ie6 & 7
            indent += "\t";
            for (var item in obj) {
                try {
                    child = obj[item];
                } 
                catch (e) {
                    child = "<Unable to Evaluate>";
                }
                if (typeof child == "object") {
                    output += dumpObj(child, item, indent, depth + 1, $elm);
                }
                else {
                    output += indent + item + ": " + child + "\n";
                }
            }
            if ($elm != undefined) {
                $elm.html(output);//this is a DOM element warpped in jQuery object for outputting content to page
            }
            return output;
        }
        else {
            return obj;
        }
    }
}












