let host;
if (process.env.NODE_ENV === 'production') {
    module.exports = host = 'https://campaign-manager-node.herokuapp.com/';
}