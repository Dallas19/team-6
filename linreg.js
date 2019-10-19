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
            sum_xx += X[i]*X[i]
            sum_yy += Y[i]*Y[i]
            sum_xy = X[i]*Y[i]
        } 
        out[0] = (Y.length*sum_xy - sum_x*sum_y)/(Y.length * sum_xx - sum_x * sum_x)
        out[1] = (sum_y - out[0]*sum_x)/Y.length
        return out
    },
    //takes a set of json row block
    getRawData: function(jsonPoints){
        
    }
  };