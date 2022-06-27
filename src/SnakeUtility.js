export default class SnakeUtility {
    /**
     * Modulo with correct handling of negative divident
     * @param {int} num divident
     * @param {int} div divisor
     * @returns Modulo
     */
    static mod(num, div) {
        return ((num % div) + div) % div;
    };

    /**
     * sleeps for a specified time
     * @param {int} milliseconds time to wait for
     * @returns
     */
    static sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
}
