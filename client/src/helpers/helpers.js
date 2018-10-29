/* 
    @Author: Chisimdi Damian Ezeanieto
    @Date: 30/10/2018
*/
const Helpers = {
    // This method is to check if a field or object is empty
    isEmpty(value) {
        return(
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        );
    }
};

export default Helpers;