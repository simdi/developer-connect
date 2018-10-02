/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/

module.exports = Helpers = {
    // This is going to handle all api params validation errors.
    handleParamsError: (params) => {
        
    },
    // This method is to check oi
    isEmpty(value) {
        return(
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }
};