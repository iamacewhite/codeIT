/**
 * Created by Samuel on 2/10/2016.
 */
exports.getinfo = function (req, res) {
    res.status('200').send({"message": "This is the current holding of our team"});
};
