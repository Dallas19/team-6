module.exports = {
    //labeledData is an object that contains two n dimensional arrays,
    //where "X"
    linRegRaw: function (labeledData) {
        let X = labeledData.X
        let Y = labeledData.Y
        var out = {};
        let sum_x, sum_y, sum_xy, sum_xx, sum_yy;
        sum_x = sum_y = sum_xy = sum_xx = sum_yy = 0;
        for (let i = 0; i < Y.length; ++i){
            sum_x += X[i];
            sum_y += Y[i];
            sum_xx += X[i]*X[i];
            sum_yy += Y[i]*Y[i];
            sum_xy += X[i]*Y[i];
        } 
        out[0] = (Y.length*sum_xy - sum_x*sum_y)/(Y.length * sum_xx - sum_x * sum_x);
        out[1] = (sum_y - out[0]*sum_x)/Y.length;
        return out;
    },
    //takes a set of json row block
    getRawData: function(jsonObjArr){
        var X_vals = new Array();
        var Y_vals = new Array(); 
        for(let i = 0; i < jsonObjArr.length; ++i){
            //hardcoded to include for 3 months
            //TODO: Hardcoding should take different month names
            //Point 1
            X_vals.push(0);
            Y_vals.push(jsonObjArr[i]['Unique Count July 2019']);
            //Point 2
            X_vals.push(1);
            Y_vals.push(jsonObjArr[i]['Unique Count August 2019']);
            //Point 3
            X_vals.push(2);
            Y_vals.push(jsonObjArr[i]['Unique Count September 2019']);
        }
        return {X: X_vals, Y: Y_vals};
    }
  };